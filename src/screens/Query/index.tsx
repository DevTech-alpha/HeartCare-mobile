import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator, RefreshControl } from 'react-native';
import { addDoc, collection, getDocs, deleteDoc, doc, setDoc, query, where } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import Medicao from '../../model/Medicao';
import * as Animatable from 'react-native-animatable';
import { db } from '../../config/firebase';
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

      // Ordenar as medições pela data, da mais nova para a mais velha
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

  const abrirModalEdicao = (medicao: Medicao) => {
    setMedicaoSelecionada(medicao);
    setIsModalVisible(true);
  };

  const handleMedicaoAdicionada = () => {
    setIsModalVisible(false);
    setMedicaoSelecionada(null);
    carregarMedicoes();
  };

  const handleMedicaoExcluida = () => {
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
          {/* Renderizar o formulário apenas se historicoVisivel for falso */}
          {!historicoVisivel && (
            <MedicaoForm onMedicaoAdicionada={handleMedicaoAdicionada} loading={loading} />
          )}

          {/* Botão "Mostrar Histórico" */}
          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={() => setHistoricoVisivel(!historicoVisivel)}
          >
            <Text style={styles.textoBotao}>
              {historicoVisivel ? 'Ocultar Histórico' : 'Mostrar Histórico'}
            </Text>
          </TouchableOpacity>

          {/* Renderizar o FlatList somente se historicoVisivel for true */}
          {historicoVisivel && (
            <FlatList
              data={medicoes}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text style={styles.textoVazio}>Nenhum registro encontrado.</Text>}
              renderItem={({ item }) => (
                <MedicaoItem
                  medicao={item}
                  onMedicaoExcluida={handleMedicaoExcluida}
                  onMedicaoEditada={abrirModalEdicao} />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}

          {/* Modal de Edição */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(false);
              setMedicaoSelecionada(null);
            }}
          >
            <View style={styles.containerModal}>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => {
                  setIsModalVisible(false);
                  setMedicaoSelecionada(null);
                }}
              >
                <Text style={styles.textoBotao}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Animatable.View>
      </View>
    </>
  );
};

export default PressaoArterial;
