import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
  ActivityIndicator, // Importe o componente ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackTypes } from '../../routes/NavigationStack';
import * as Animatable from 'react-native-animatable';
import { db } from '../../config/firebase';
import {
  User,
  getAuth,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  DocumentData,
  updateDoc,
} from 'firebase/firestore';
import ImagePicker, { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { styles } from './styles';

const UserProfileScreen = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const navigation = useNavigation<StackTypes>();
  const [loading, setLoading] = useState(false); // Adicione o estado de loading
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Defina o estado de loading como true

        if (user) {
          const uid = user.uid;
          const userRef = doc(collection(db, 'users'), uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as DocumentData;
            setUsername(userData.username || '');
            setName(userData.name || '');
            setLastName(userData.lastName || '');
            setDob(userData.dob || '');
            setPhoto(userData.photo || null);
          }
        }

        setLoading(false); // Limpe o estado de loading
      } catch (error) {
        setLoading(false); // Em caso de erro, limpe o estado de loading
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    // Implemente a lógica para escolher a foto
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true); // Defina o estado de loading como true

      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        setLoading(false); // Em caso de erro, limpe o estado de loading
        return;
      }

      const uid = user.uid;

      if (!username || !name || !lastName || !dob || !email) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
        setLoading(false); // Em caso de erro, limpe o estado de loading
        return;
      }

      const userRef = doc(collection(db, 'users'), uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          username,
          name,
          lastName,
          dob,
          email,
          photo,
        });
      } else {
        await setDoc(userRef, {
          uid,
          username,
          name,
          lastName,
          dob,
          email,
          photo,
        });
      }

      await updateProfile(user, {
        displayName: username,
        photoURL: photo,
      });

      setLoading(false); // Limpe o estado de loading
      Alert.alert('Atualizado com sucesso');
    } catch (error) {
      setLoading(false); // Em caso de erro, limpe o estado de loading
      console.error('Erro ao salvar o perfil:', error);
      Alert.alert(
        'Erro',
        'Houve um erro ao salvar o perfil. Tente novamente mais tarde.'
      );
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true); // Defina o estado de loading como true

      await signOut(auth);
      navigation.navigate('Login');

      setLoading(false); // Limpe o estado de loading
    } catch (error) {
      setLoading(false); // Em caso de erro, limpe o estado de loading
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Houve um erro ao fazer logout. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Complete seu Perfil</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={styles.profileImageContainer}
        >
          {photo ? (
            <Image source={{ uri: photo }} style={styles.profileImage} />
          ) : (
            <Text style={styles.choosePhotoText}>Escolha uma foto</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          onChangeText={(text) => setDob(text)}
          value={dob}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TouchableOpacity style={styles.buttonAcessar} onPress={handleSaveProfile} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar perfil</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  );
};

export default UserProfileScreen;
