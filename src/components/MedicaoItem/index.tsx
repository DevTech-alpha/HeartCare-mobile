import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { styles } from './styles';
import MedicaoItemProps from '../../@types/MedicaoItemProps';
import ModalEdicao from '../ModalEdicao';

const MedicaoItem: React.FC<MedicaoItemProps> = ({ medicao, deleteMedicao }) => {
  const [modalVisivel, setModalVisivel] = useState(false);

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const salvarEdicao = (novaMedicao: any) => {
    fecharModal();
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
        <TouchableOpacity style={styles.botaoEditar} onPress={abrirModal}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoExcluir} onPress={() => deleteMedicao(medicao.id)}>
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>

      <ModalEdicao
        visivel={modalVisivel}
        fecharModal={fecharModal}
        medicao={medicao}
        salvarEdicao={salvarEdicao}
      />
    </View>
  );
};

export default MedicaoItem;
