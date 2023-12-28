import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { getAuth } from 'firebase/auth'; // Import getAuth for authentication
import Medicao from '../../model/Medicao';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles';

const PressaoArterial = () => {
  const auth = getAuth(); // Initialize Firebase Authentication
  const user = auth.currentUser; // Retrieve the current user

  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [pulso, setPulso] = useState('');
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [medicaoSelecionada, setMedicaoSelecionada] = useState<Medicao | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [horario, setHorario] = useState(new Date());
  const [data, setData] = useState(new Date());

  const adicionarMedicao = async () => {
    if (sistolica.trim() !== '' && diastolica.trim() !== '' && pulso.trim() !== '') {
      const novaMedicao: Medicao = {
        id: Date.now(),
        userId: user.uid, 
        sistolica,
        diastolica,
        pulso,
        horario: horario.toISOString(),
        data: data.toISOString(),
      };

      const medicoesRef = collection(db, 'medicoes');
      await addDoc(medicoesRef, novaMedicao);

      limparCampos();
      carregarMedicoes();
      alert('Medição adicionada com sucesso!');
    }
  };

  const limparCampos = () => {
    setSistolica('');
    setDiastolica('');
    setPulso('');
    setHorario(new Date());
    setData(new Date());
  };

  const editarMedicao = async () => {
    if (sistolica.trim() !== '' && diastolica.trim() !== '' && pulso.trim() !== '' && medicaoSelecionada) {
      const medicaoRef = doc(db, 'medicoes', medicaoSelecionada.id.toString());
      await setDoc(medicaoRef, {
        sistolica,
        diastolica,
        pulso,
        horario: horario.toISOString(),
        data: data.toISOString(),
      });

      limparCampos();
      setIsModalVisible(false);
      setMedicaoSelecionada(null);
      carregarMedicoes();
    }
  };

  const excluirMedicao = async (idMedicao: number) => {
    const medicaoRef = doc(db, 'medicoes', idMedicao.toString());
    await deleteDoc(medicaoRef);
    carregarMedicoes();
    alert('Medição excluída com sucesso!');
  };

  const carregarMedicoes = async () => {
    if (user) {
      const medicoesRef = collection(db, 'medicoes');
      const q = query(medicoesRef, where('userId', '==', user.uid)); // Use user.uid as the userId
      const querySnapshot = await getDocs(q);

      const medicoesData: Medicao[] = querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Medicao));
      setMedicoes(medicoesData);
    }
  };

  useEffect(() => {
    carregarMedicoes();
  }, [user]);

  const isMedicaoInRanged = (medicao: Medicao) => {
    const sistolicaValue = parseInt(medicao.sistolica, 10);
    const diastolicaValue = parseInt(medicao.diastolica, 10);
    const pulsoValue = parseInt(medicao.pulso, 10);
    const sistolicaInRange = sistolicaValue >= 90 && sistolicaValue <= 120;
    const diastolicaInRange = diastolicaValue >= 60 && diastolicaValue <= 80;
    const pulsoInRange = pulsoValue >= 60 && pulsoValue <= 100;

    return sistolicaInRange && diastolicaInRange && pulsoInRange;
  };


  return (
    <View style={styles.container}>
    <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
      <Text style={styles.message}>Pressão Arterial</Text>
    </Animatable.View>


    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.label}>Sistólica</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor sistólico"
          value={sistolica}
          onChangeText={(texto) => setSistolica(texto)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Diastólica</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor diastólico"
          value={diastolica}
          onChangeText={(texto) => setDiastolica(texto)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Pulso</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor do pulso"
          value={pulso}
          onChangeText={(texto) => setPulso(texto)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarMedicao}>
          <Text style={styles.textoBotao}>Adicionar Medição</Text>
        </TouchableOpacity>

        <FlatList
          data={medicoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemMedicao}>
              <Text style={styles.textoMedicao}>Sistólica: {item.sistolica}</Text>
              <Text style={styles.textoMedicao}>Diastólica: {item.diastolica}</Text>
              <Text style={styles.textoMedicao}>Pulso: {item.pulso}</Text>
              <Text style={styles.textoMedicao}>Horário: {new Date(item.horario).toLocaleTimeString()}</Text>
              <Text style={styles.textoMedicao}>Data: {new Date(item.data).toLocaleDateString()}</Text>
              {isMedicaoInRanged(item) ? (
                <Text style={styles.textoMedicaoBoa}>Pressão Boa</Text>
              ) : (
                <Text style={styles.textoMedicaoRuim}>Pressão Ruim</Text>
              )}
              <View style={styles.containerBotoes}>
                <TouchableOpacity style={styles.botaoEditar} onPress={() => {}}>
                  <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirMedicao(item.id)}>
                  <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

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
            <TouchableOpacity style={styles.botaoEditar} onPress={editarMedicao}>
              <Text style={styles.textoBotao}>Salvar Edição</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCancelar} onPress={() => {
              setIsModalVisible(false);
              setMedicaoSelecionada(null);
            }}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        </Animatable.View>
    </View>
  );
};

export default PressaoArterial;

