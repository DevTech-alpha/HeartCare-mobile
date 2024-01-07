import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator, RefreshControl } from 'react-native';
import { addDoc, collection, getDocs, deleteDoc, doc, setDoc, query, where } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import Medicao from '../../model/Medicao';
import * as Animatable from 'react-native-animatable';
import { db } from '../../firebase/firebase';
import { styles } from './styles';
import MedicaoItem from '../../components/MedicaoItem';
import MedicaoForm from '../../components/MedicaoForm';
import { Header } from '../../components/Header';

const PressaoArterial = () => {
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [medicaoSelecionada, setMedicaoSelecionada] = useState<Medicao | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [historicoVisivel, setHistoricoVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const carregarMedicoes = async () => {
    if (user) {
      const medicoesRef = collection(db, 'medicoes');
      const q = query(medicoesRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const medicoesData: Medicao[] = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      } as Medicao));

      medicoesData.sort((a, b) => {
        const dataA = new Date(a.data).getTime();
        const dataB = new Date(b.data).getTime();
        return dataB - dataA;
      });

      setMedicoes(medicoesData);
    }
  };

  const onRefresh = useCallback(() => {
    carregarMedicoes();
  }, []);

  useEffect(() => {
    carregarMedicoes();
  }, [user]);


  const handleMedicaoAdicionada = () => {
    setIsModalVisible(false);
    setMedicaoSelecionada(null);
    carregarMedicoes();
  };


  return (
    <>
      <View>
        <Header title='𝓹𝓻𝓮𝓼𝓼𝓪̃𝓸 𝓪𝓻𝓽𝓮𝓻𝓲𝓪𝓵' />
      </View>
      <View style={styles.container}>
        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          {!historicoVisivel && (
            <MedicaoForm onMedicaoAdicionada={handleMedicaoAdicionada} loading={loading} />
          )}

          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={() => setHistoricoVisivel(!historicoVisivel)}
          >
            <Text style={styles.textoBotao}>
              {historicoVisivel ? 'Ocultar Histórico' : 'Mostrar Histórico'}
            </Text>
          </TouchableOpacity>

          {historicoVisivel && (
            <FlatList
              data={medicoes}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text style={styles.textoVazio}>Nenhum registro encontrado.</Text>}
              renderItem={({ item }) => (
                <MedicaoItem
                  medicao={item}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}

        </Animatable.View>
      </View>
    </>
  );
};

export default PressaoArterial;
