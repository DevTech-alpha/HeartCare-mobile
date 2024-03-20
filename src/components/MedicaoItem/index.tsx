import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import MedicaoItemProps from "../../props/MedicaoItemProps";
import ModalEdicao from "../ModalEdit";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const MedicaoItem: React.FC<MedicaoItemProps> = ({
  medicao,
  deleteMedicao,
}) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();

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
        return language.TEXTO.PRESSAO_BAIXA;
      } else if (
        sistolica >= 90 &&
        sistolica <= 120 &&
        diastolica >= 60 &&
        diastolica <= 80
      ) {
        return language.TEXTO.PRESSAO_NORMAL;
      } else if (
        sistolica > 120 &&
        diastolica > 80 &&
        sistolica <= 140 &&
        diastolica <= 90
      ) {
        return language.TEXTO.PRE_HIPERTENSAO;
      } else if (
        sistolica > 140 &&
        diastolica > 90 &&
        sistolica <= 160 &&
        diastolica <= 100
      ) {
        return language.TEXTO.HIPERTENSAO_ESTAGIO_1;
      } else if (sistolica > 160 && diastolica > 100) {
        return language.TEXTO.HIPERTENSAO_ESTAGIO_2;
      } else {
        return language.TEXTO.PRESSAO_NAO_CLASSIFICADA;
      }
    } else {
      return language.TEXTO.VALORES_INVALIDOS;
    }
  };

  return (
    <View
      style={[
        styles.itemMedicao,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD },
      ]}
    >
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        {language.TEXTO.SISTOLICA}:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {medicao.sistolica}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        {language.TEXTO.DIASTOLICA}:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {medicao.diastolica}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        {language.TEXTO.PULSO}:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {medicao.pulso}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        {language.TEXTO.HORARIO}:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {new Date(medicao.horario).toLocaleTimeString()}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        {language.TEXTO.DATA}:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {new Date(medicao.data).toLocaleDateString()}
        </Text>
      </Text>
      <Text style={[styles.textoMedicao, { color: theme.COLORS.POST_CONTENT }]}>
        {language.TEXTO.AVALIACAO}:{" "}
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
            {language.TEXTO.EDITAR}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: theme.COLORS.BUTTON }]}
          onPress={() => deleteMedicao(medicao.id)}
        >
          <Text
            style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            {language.TEXTO.EXCLUIR}
          </Text>
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
