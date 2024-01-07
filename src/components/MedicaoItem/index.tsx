import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import MedicaoItemProps from '../../@types/MedicaoItemProps';

const MedicaoItem: React.FC<MedicaoItemProps> = ({ medicao }) => {
 

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
        >
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoExcluir}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicaoItem;
