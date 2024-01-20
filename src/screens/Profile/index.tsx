import React, { useState, useEffect, useCallback } from "react"
import {
	Text,
	View,
	Alert,
	ScrollView,
	TouchableOpacity,
	RefreshControl,
} from "react-native"
import { getAuth, User } from "firebase/auth"
import {
	collection,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	DocumentData,
	query,
	getDocs,
	where,
	deleteDoc,
} from "firebase/firestore"
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { db } from "../../firebase/firebaseConfig"
import * as ImagePicker from "expo-image-picker"
import { styles } from "./styles"
import ProfileImage from "../../components/ProfileImage"
import UserProfileForm from "../../components/UserProfileForm"
import PostItem from "../../components/PostItemProfile"
import Post from "../../model/Post"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome } from "@expo/vector-icons"
import { propsStack } from "../../routes/Models"
import { useAuth } from "../../hooks/AuthProvider"
import { asyncRemoveUser } from "../../utils/store"
import { Header } from "../../components/Header"

import { useTheme } from "../../hooks/ThemeProvider"

const UserProfileScreen = () => {
	const { setAuthData } = useAuth()
	const auth = getAuth()
	const user: User | null = auth.currentUser

	const {theme, toggleTheme } = useTheme();
	const [loading, setLoading] = useState(false)
	const [posts, setPosts] = useState<Post[]>([])
	const [refreshing, setRefreshing] = useState(false)
	const [isDayMode, setIsDayMode] = useState(true); 

	const [username, setUsername] = useState("")
	const [photo, setPhoto] = useState<string | null>(null)
	const [name, setName] = useState("")
	const [lastName, setLastName] = useState("")
	const [dob, setDob] = useState("")
	const [email, setEmail] = useState(user?.email || "")
	const [userPosts, setUserPosts] = useState<Post[]>([])
	const [editMode, setEditMode] = useState(false)

	const storage = getStorage()
	const { navigate } = useNavigation<propsStack>()

	const onRefresh = useCallback(() => {
		fetchUserPosts()
	}, [])

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setLoading(true)

				if (user) {
					const uid = user.uid
					const userRef = doc(collection(db, "users"), uid)
					const userDoc = await getDoc(userRef)

					if (userDoc.exists()) {
						const userData = userDoc.data() as DocumentData
						setUsername(userData.username || "")
						setName(userData.name || "")
						setLastName(userData.lastName || "")
						setDob(userData.dob || "")
						setPhoto(userData.photo)
					}
				}

				setLoading(false)
			} catch (error) {
				setLoading(false)
				console.error("Error fetching user data:", error)
			}
		}

		fetchUserData()
		fetchUserPosts()
	}, [user])

	const fetchUserPosts = async () => {
		try {
			setLoading(true)
			if (user) {
				const uid = user.uid
				const postsQuery = query(
					collection(db, "posts"),
					where("idpub", "==", uid)
				)
				const postsSnapshot = await getDocs(postsQuery)
				const userPostsData = postsSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as Post[]

				setUserPosts(userPostsData)
			}

			setLoading(false)
			setRefreshing(false)
		} catch (error) {
			setLoading(false)
			setRefreshing(false)
			console.error("Error fetching user posts:", error)
		}
	}

	const handleChoosePhoto = async () => {
		try {
			const permissionResult =
				await ImagePicker.requestMediaLibraryPermissionsAsync()

			if (permissionResult.granted === false) {
				Alert.alert("Permissão negada para acessar a biblioteca de mídia.")
				return
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
			})

			if (result.canceled === false && result.assets && result.assets.length > 0) {
				const supportedFormats = ["jpeg", "png", "jpg"]
				const uriParts = result.assets[0].uri.split(".")
				const fileExtension = uriParts[uriParts.length - 1].toLowerCase()

				if (supportedFormats.includes(fileExtension)) {
					setPhoto(result.assets[0].uri)
				} else {
					Alert.alert(
						"Formato de imagem não suportado. Por favor, escolha outra imagem."
					)
				}
			}
		} catch (error) {
			console.error("Erro ao escolher a foto:", error)
		}
	}

	const handleSaveProfile = async () => {
		try {
			setLoading(true)

			if (!user) {
				Alert.alert("Erro", "Usuário não autenticado.")
				setLoading(false)
				return
			}

			const uid = user.uid

			if (!username || !name || !lastName || !dob || !email) {
				Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.")
				setLoading(false)
				return
			}

			let photoUrl = photo

			if (photo && !photo.startsWith("gs://fir-auth-9f9f7.appspot.com")) {
				const storageRef = ref(storage, `profile_photos/${uid}`)
				const response = await fetch(photo)
				const blob = await response.blob()

				await uploadBytes(storageRef, blob)
				photoUrl = await getDownloadURL(storageRef)
			}

			const userRef = doc(collection(db, "users"), uid)
			const userDoc = await getDoc(userRef)

			if (userDoc.exists()) {
				await updateDoc(userRef, {
					username,
					name,
					lastName,
					dob,
					email,
					photo: photoUrl,
				})
			} else {
				await setDoc(userRef, {
					uid,
					username,
					name,
					lastName,
					dob,
					email,
					photo: photoUrl,
				})
			}

			setLoading(false)
			setEditMode(false)
			Alert.alert("Atualizado com sucesso")
		} catch (error) {
			setLoading(false)
			console.error("Erro ao salvar o perfil:", error)
			Alert.alert(
				"Erro",
				"Houve um erro ao salvar o perfil. Tente novamente mais tarde."
			)
		}
	}

	const deletePost = async (postId: string) => {
		try {
			const postRef = doc(db, "posts", postId)
			const postDoc = await getDoc(postRef)

			if (postDoc.exists() && postDoc.data()?.idpub === user?.uid) {
				Alert.alert(
					"Confirmação",
					"Tem certeza de que deseja apagar esta publicação?",
					[
						{
							text: "Cancelar",
							style: "cancel",
						},
						{
							text: "Apagar",
							onPress: async () => {
								await deleteDoc(postRef)

								const updatedPosts = posts.filter(
									(post) => post.id !== postId
								)
								setPosts(updatedPosts)
								fetchUserPosts()
							},
						},
					],
					{ cancelable: true }
				)
			} else {
				console.warn("User does not have permission to delete this post")
			}
		} catch (error) {
			console.error("Error deleting post:", error)
		}
	}

	const handleEditClick = () => {
		setEditMode(!editMode)
	}

	const handleSignOut = async () => {
		Alert.alert(
			"Confirmação",
			"Deseja realmente sair?",
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Sair",
					onPress: async () => {
						setAuthData(undefined);
						await asyncRemoveUser();
					},
				},
			],
			{ cancelable: false }
		);
	};

	const handleToggleTheme = () => {
		toggleTheme();
		setIsDayMode(!isDayMode);
	};

	return (
		<View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
			<View>
				<Header title="𝓟𝓮𝓻𝓯𝓲𝓵" />
			</View>

			<ProfileImage photo={photo} onPress={handleChoosePhoto} />

			<TouchableOpacity style={[styles.button, { backgroundColor: theme.COLORS.PRIMARY }]} onPress={handleEditClick}>
				<Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>
					{editMode ? "Cancelar" : "Editar Usuário"}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.themeToggleButton, { backgroundColor: theme.COLORS.BACKGROUND }]} onPress={handleToggleTheme}>
				<FontAwesome
					name={isDayMode ? 'moon-o' : 'sun-o'}
					size={25}
					color={theme.COLORS.ICON}
				/>
			</TouchableOpacity>

			<ScrollView
				contentContainerStyle={styles.scrollViewContent}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
				{editMode && (
					<UserProfileForm
						username={username}
						name={name}
						lastName={lastName}
						dob={dob}
						email={email}
						setUsername={setUsername}
						setName={setName}
						setLastName={setLastName}
						setDob={setDob}
						setEmail={setEmail}
						handleSaveProfile={handleSaveProfile}
						loading={loading}
					/>
				)}

				<View style={[styles.userPostsContainer, { backgroundColor: theme.COLORS.BACKGROUND }]}>
					<View style={styles.botoes}>
						<TouchableOpacity onPress={handleSignOut}>
							<FontAwesome
								name="sign-out"
								size={30}
								color={theme.COLORS.ICON}
							/>
						</TouchableOpacity>
					</View>
					{userPosts.map((post) => (
						<PostItem
							key={post.id}
							item={post}
							toggleLike={() => { }}
							userUid={user?.uid || ""}
							deletePost={deletePost}
						/>
					))}
					{userPosts.length === 0 && (
						<Text style={[styles.messageNop ,{color: theme.COLORS.TEXT}]}>Não há publicações.</Text>
					)}
				</View>
			</ScrollView>
		</View>
	)
}

export default UserProfileScreen
