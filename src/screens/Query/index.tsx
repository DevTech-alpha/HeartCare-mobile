import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  ScrollView,
} from "react-native";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import Medicao from "../../models/Medicao";
import { db } from "../../utils/firebase";
import { styles } from "./styles";
import MedicaoItem from "../components/MedicaoItem";
import MedicaoForm from "../components/MedicaoForm";
import Header from "../components/Header";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AtividadesForm from "../components/AtividadesForm";
import AtividadeItem from "../components/AtividadesItem";
import { useTheme } from "../../context/ThemeContext";

function Query() {
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [historicoVisivel, setHistoricoVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [AtividadesVisivel, setAtividadesVisivel] = useState(false);

  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const { theme } = useTheme();

  const carregarMedicoes = useCallback(async () => {
    if (user) {
      const medicoesRef = collection(db, "medicoes");
      const q = query(medicoesRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const medicoesData: Medicao[] = querySnapshot.docs.map(
        (doc: any) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Medicao)
      );

      medicoesData.sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );

      setMedicoes(medicoesData);
    }
  }, [user]);

  const onRefresh = useCallback(() => {
    carregarMedicoes();
    setRefreshing(false);
  }, [carregarMedicoes]);

  useEffect(() => {
    carregarMedicoes();
  }, [user, carregarMedicoes]);

  const handleMedicaoAdicionada = () => {
    setLoading(true);
    carregarMedicoes();
    setLoading(false);
  };

  const deleteMedicao = async (postId: string) => {
    try {
      const postRef = doc(db, "medicoes", postId);

      Alert.alert(
        "Confirmação",
        "Deseja apagar esta medição?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Apagar",
            onPress: async () => {
              await deleteDoc(postRef);
              Alert.alert("Excluído com sucesso");
              carregarMedicoes();
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {}
  };

  const toggleScreen = () => {
    setHistoricoVisivel(!historicoVisivel);
  };
  const toggleAtividades = () => {
    setAtividadesVisivel(!AtividadesVisivel);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header title={historicoVisivel ? "Histórico" : "Atividades"} />
      {historicoVisivel ? (
        <TouchableOpacity
          style={[
            styles.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleScreen}
        >
          <AntDesign name="arrowleft" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleScreen}
        >
          <MaterialIcons
            name={"calendar-today"}
            size={30}
            color={theme.COLORS.POST_TITLE}
          />
        </TouchableOpacity>
      )}

      <View
        style={[
          styles.containerForm,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
      >
        {!historicoVisivel && (
          <>
            {AtividadesVisivel && (
              <AtividadesForm MudarCard={toggleAtividades} user={user} />
            )}
            {!AtividadesVisivel && (
              <MedicaoForm
                MudarCard={toggleAtividades}
                onMedicaoAdicionada={handleMedicaoAdicionada}
                loading={loading}
                user={user}
              />
            )}
          </>
        )}
        {historicoVisivel && (
          <>
            <AtividadeItem user={user} />
            <FlatList
              data={medicoes}
              ListEmptyComponent={
                <Text style={[styles.textoVazio, { color: theme.COLORS.TEXT }]}>
                  Nenhuma medição encontrada
                </Text>
              }
              renderItem={({ item }) => (
                <MedicaoItem medicao={item} deleteMedicao={deleteMedicao} />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
}

export default Query;
