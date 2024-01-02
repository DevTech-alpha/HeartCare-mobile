import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { addDoc, collection, getDocs, deleteDoc, doc, setDoc, query, where } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import Medicao from '../../model/Medicao';
import * as Animatable from 'react-native-animatable';
import { db } from '../../config/firebase';
import { styles } from './styles';
import MedicaoItem from '../../components/MedicaoItem';
import MedicaoForm from '../../components/MedicaoForm';

const PressaoArterial = () => {
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [medicaoSelecionada, setMedicaoSelecionada] = useState<Medicao | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [historicoVisivel, setHistoricoVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setMedicoes(medicoesData);
    }
  };

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
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Pressão Arterial</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <MedicaoForm onMedicaoAdicionada={handleMedicaoAdicionada} loading={loading} />

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
                onMedicaoEditada={abrirModalEdicao}
              />
            )}
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
  );
};

export default PressaoArterial;
