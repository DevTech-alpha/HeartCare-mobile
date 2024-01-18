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

  const avaliarPressao = () => {
    const sistolica = parseFloat(medicao.sistolica);
    const diastolica = parseFloat(medicao.diastolica);
  
    if (!isNaN(sistolica) && !isNaN(diastolica)) {
      if (sistolica < 90 && diastolica < 60) {
        return 'Pressão Baixa';
      } else if (sistolica >= 90 && sistolica <= 120 && diastolica >= 60 && diastolica <= 80) {
        return 'Pressão Normal';
      } else if (sistolica > 120 && diastolica > 80 && sistolica <= 140 && diastolica <= 90) {
        return 'Pré-Hipertensão';
      } else if (sistolica > 140 && diastolica > 90 && sistolica <= 160 && diastolica <= 100) {
        return 'Hipertensão Estágio 1';
      } else if (sistolica > 160 && diastolica > 100) {
        return 'Hipertensão Estágio 2';
      } else {
        return 'Pressão Não Classificada';
      }
    } else {
      return 'Valores Inválidos';
    }
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
      <Text style={styles.textoMedicao}>Avaliação: {avaliarPressao()}</Text>
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
