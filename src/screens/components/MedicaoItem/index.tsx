import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import MedicaoItemProps from "../../../props/MedicaoItemProps";
import ModalEdicao from "../ModalEdit";
import { useTheme } from "../../../context/ThemeContext";
import * as Animatable from "react-native-animatable";
import shadow from '../../../utils/styles/index';

export default function MedicaoItem({
  medicao,
  deleteMedicao,
}: MedicaoItemProps) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { theme } = useTheme();

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
        return "Pressão baixa";
      } else if (
        sistolica >= 90 &&
        sistolica <= 120 &&
        diastolica >= 60 &&
        diastolica <= 80
      ) {
        return "Pressão normal";
      } else if (
        sistolica > 120 &&
        diastolica > 80 &&
        sistolica <= 140 &&
        diastolica <= 90
      ) {
        return "Pré-hipertensão";
      } else if (
        sistolica > 140 &&
        diastolica > 90 &&
        sistolica <= 160 &&
        diastolica <= 100
      ) {
        return "Hipertensão estágio 1";
      } else if (sistolica > 160 && diastolica > 100) {
        return "Hipertensão estágio 2";
      } else {
        return "Pressão não classificada";
      }
    } else {
      return "Valores inválidos";
    }
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.container,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD,
          ...shadow.shadowOverlay
         },
      ]}
    >
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        Sistólica:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {medicao.sistolica}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        Diastólica:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {medicao.diastolica}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        Pulso:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {medicao.pulso}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        Horário:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {new Date(medicao.horario).toLocaleTimeString()}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        Data:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {new Date(medicao.data).toLocaleDateString()}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        Avaliação:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {avaliarPressao()}
        </Text>
      </Text>
      <View style={styles.containerBotoes}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: theme.COLORS.BUTTON }]}
          onPress={abrirModal}
        >
          <Text
            style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: theme.COLORS.BUTTON }]}
          onPress={() => deleteMedicao(medicao.id)}
        >
          <Text
            style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Excluir
          </Text>
        </TouchableOpacity>
      </View>

      <ModalEdicao
        visivel={modalVisivel}
        fecharModal={fecharModal}
        medicao={medicao}
        salvarEdicao={salvarEdicao}
      />
    </Animatable.View>
  );
}
