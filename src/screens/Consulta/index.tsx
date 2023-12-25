import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { styles } from './styles';

interface Medicao {
  id: number;
  sistolica: string;
  diastolica: string;
  pulso: string;
  horario: string;
  data: string;
}

export default function PressaoArterial() {
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [pulso, setPulso] = useState('');
  const [medicoes, setMedicoes] = useState<Medicao[]>([]); 
  const [medicaoSelecionada, setMedicaoSelecionada] = useState<Medicao | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [horario, setHorario] = useState(new Date());
  const [data, setData] = useState(new Date());

  const adicionarMedicao = () => {
    if (sistolica.trim() !== '' && diastolica.trim() !== '' && pulso.trim() !== '') {
      const novaMedicao: Medicao = {
        id: Date.now(),
        sistolica,
        diastolica,
        pulso,
        horario: horario.toISOString(),
        data: data.toISOString(),
      };

      setMedicoes((medicoesAntigas) => [...medicoesAntigas, novaMedicao]);
      limparCampos();
    }
  };

  const editarMedicao = () => {
    if (sistolica.trim() !== '' && diastolica.trim() !== '' && pulso.trim() !== '' && medicaoSelecionada) {
      setMedicoes((medicoesAntigas) =>
        medicoesAntigas.map((medicao) =>
          medicao.id === medicaoSelecionada.id
            ? {
                ...medicao,
                sistolica,
                diastolica,
                pulso,
                horario: horario.toISOString(),
                data: data.toISOString(),
              }
            : medicao
        )
      );

      limparCampos();
      setIsModalVisible(false);
      setMedicaoSelecionada(null);
    }
  };

  const excluirMedicao = (idMedicao: number) => {
    setMedicoes((medicoesAntigas) =>
      medicoesAntigas.filter((medicao) => medicao.id !== idMedicao)
    );
  };

  const pressionarBotaoEditar = (medicao: Medicao) => {
    setSistolica(medicao.sistolica);
    setDiastolica(medicao.diastolica);
    setPulso(medicao.pulso);
    setHorario(new Date(medicao.horario));
    setData(new Date(medicao.data));
    setMedicaoSelecionada(medicao);
    setIsModalVisible(true);
  };

  const limparCampos = () => {
    setSistolica('');
    setDiastolica('');
    setPulso('');
    setHorario(new Date());
    setData(new Date());
  };

  const isMedicaoInRanged = (medicao: Medicao) => {
    const sistolicaValue = parseInt(medicao.sistolica, 10);
    const diastolicaValue = parseInt(medicao.diastolica, 10);
    const pulsoValue = parseInt(medicao.pulso, 10);

    // Lógica para verificar se a medição está dentro do intervalo desejado
    // Você pode ajustar esses valores conforme necessário
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

  
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarMedicao}
        >
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
                <TouchableOpacity
                  style={styles.botaoEditar}
                  onPress={() => pressionarBotaoEditar(item)}
                >
                  <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() => excluirMedicao(item.id)}
                >
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
            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => {
                setIsModalVisible(false);
                setMedicaoSelecionada(null);
              }}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Animatable.View>
    </View>
  );
}
