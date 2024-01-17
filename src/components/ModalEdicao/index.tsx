import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Medicao from '../../model/Medicao';
import ModalEdicaoProps from '../../@types/ModalEdicaoProps';



const ModalEdicao: React.FC<ModalEdicaoProps> = ({ visivel, fecharModal, medicao, salvarEdicao }) => {
  const [sistolicaEditada, setSistolicaEditada] = useState(medicao.sistolica);
  const [diastolicaEditada, setDiastolicaEditada] = useState(medicao.diastolica);
  const [pulsoEditado, setPulsoEditado] = useState(medicao.pulso);
  const [loading, setLoading] = useState(false);

  const handleSalvarEdicao = async () => {
    const novaMedicao: Medicao = {
      ...medicao,
      sistolica: sistolicaEditada,
      diastolica: diastolicaEditada,
      pulso: pulsoEditado,
    };

    try {
      setLoading(true);
      const medicoesRef = collection(db, 'medicoes');

      // Criar um objeto apenas com as propriedades permitidas para atualização
      const medicaoParaAtualizar: { [campo: string]: any } = {
        sistolica: novaMedicao.sistolica,
        diastolica: novaMedicao.diastolica,
        pulso: novaMedicao.pulso,
        // Adicione mais campos, se necessário
      };

      await updateDoc(doc(medicoesRef, medicao.id), medicaoParaAtualizar);

      setLoading(false);
      Alert.alert('Sucesso', 'Alterado com sucesso!')
      salvarEdicao(novaMedicao);
    } catch (error) {
      setLoading(false);
      console.error('Erro ao editar medição:', error);
      // Trate o erro conforme necessário
    }
  };

  return (
    <Modal visible={visivel} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.textoModal}>Editar Medição</Text>
          <TextInput
            style={styles.inputEditavel}
            placeholder="Sistólica"
            value={sistolicaEditada}
            onChangeText={(texto) => setSistolicaEditada(texto)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputEditavel}
            placeholder="Diastólica"
            value={diastolicaEditada}
            onChangeText={(texto) => setDiastolicaEditada(texto)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputEditavel}
            placeholder="Pulso"
            value={pulsoEditado}
            onChangeText={(texto) => setPulsoEditado(texto)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={handleSalvarEdicao}
            disabled={loading} // Desativa o botão enquanto estiver carregando
          >
            {loading ? (
              <ActivityIndicator size="small" color={styles.textoBotao.color} />
            ) : (
              <Text style={styles.textoBotao}>Salvar</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoFechar} onPress={fecharModal}>
            <Text style={styles.textoBotao}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEdicao;
