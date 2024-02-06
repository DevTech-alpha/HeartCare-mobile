import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import Medicao from '../../model/Medicao';
import { db } from '../../firebase/firebaseConfig';
import { styles } from './styles';
import MedicaoItem from '../../components/MedicaoItem';
import MedicaoForm from '../../components/MedicaoForm';
import { Header } from '../../components/Header';
import { useTheme } from '../../hooks/ThemeProvider';

const PressaoArterial = () => {
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [historicoVisivel, setHistoricoVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const { theme } = useTheme()

  const carregarMedicoes = useCallback(async () => {
    if (user) {
      const medicoesRef = collection(db, 'medicoes');
      const q = query(medicoesRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const medicoesData: Medicao[] = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      } as Medicao));

      medicoesData.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

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
      const postRef = doc(db, 'medicoes', postId);

      Alert.alert(
        'Confirmação',
        'Tem certeza de que deseja apagar esta publicação?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Apagar',
            onPress: async () => {
              await deleteDoc(postRef);
              Alert.alert('Sucesso', 'Excluido com sucesso!')
              carregarMedicoes();
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <View>
        <Header title='𝓹𝓻𝓮𝓼𝓼𝓪̃𝓸 𝓪𝓻𝓽𝓮𝓻𝓲𝓪𝓵' />
      </View>
      <View style={[styles.containerForm, { backgroundColor: theme.COLORS.BACKGROUND }]}>
        {!historicoVisivel && (
          <MedicaoForm onMedicaoAdicionada={handleMedicaoAdicionada} loading={loading} />
        )}

        <TouchableOpacity
          style={[styles.botaoAdicionar, { backgroundColor: theme.COLORS.BUTTON }]}
          onPress={() => setHistoricoVisivel(!historicoVisivel)}
        >
          <Text style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}>
            {historicoVisivel ? 'Ocultar Histórico' : 'Mostrar Histórico'}
          </Text>
        </TouchableOpacity>

        {historicoVisivel && (
          <FlatList
            data={medicoes}
            ListEmptyComponent={<Text style={[styles.textoVazio, { color: theme.COLORS.TEXT }]}>Nenhum registro encontrado.</Text>}
            renderItem={({ item }) => (
              <MedicaoItem
                medicao={item}
                deleteMedicao={deleteMedicao}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default PressaoArterial;
