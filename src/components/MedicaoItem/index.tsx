import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { styles } from './styles';
import MedicaoItemProps from '../../props/MedicaoItemProps';



const MedicaoItem: React.FC<MedicaoItemProps> = ({ medicao, onMedicaoExcluida, onMedicaoEditada }) => {
  const excluirMedicao = async () => {
    const medicaoRef = doc(db, 'medicoes', medicao.id.toString());

    try {
      await deleteDoc(medicaoRef);
      onMedicaoExcluida();
    } catch (error) {
      console.error('Erro ao excluir medição:', error);
      alert('Erro ao excluir medição. Consulte o console para mais detalhes.');
    }
  };

  const abrirModalEdicao = () => {
    onMedicaoEditada(medicao);
  };

  return (
    <View style={styles.itemMedicao}>
      <Text style={styles.textoMedicao}>Sistólica: {medicao.sistolica}</Text>
      <Text style={styles.textoMedicao}>Diastólica: {medicao.diastolica}</Text>
      <Text style={styles.textoMedicao}>Pulso: {medicao.pulso}</Text>
      <Text style={styles.textoMedicao}>
        Horário: {new Date(medicao.horario).toLocaleTimeString()}
      </Text>
      <Text style={styles.textoMedicao}>
        Data: {new Date(medicao.data).toLocaleDateString()}
      </Text>
      <View style={styles.containerBotoes}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={abrirModalEdicao}
        >
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={excluirMedicao}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicaoItem;
