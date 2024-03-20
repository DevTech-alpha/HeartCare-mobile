import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Medicao from "../../model/Medicao";
import ModalEdicaoProps from "../../props/ModalEditProps";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const ModalEdicao: React.FC<ModalEdicaoProps> = ({
  visivel,
  fecharModal,
  medicao,
  salvarEdicao,
}) => {
  const [sistolicaEditada, setSistolicaEditada] = useState(medicao.sistolica);
  const [diastolicaEditada, setDiastolicaEditada] = useState(
    medicao.diastolica
  );
  const [pulsoEditado, setPulsoEditado] = useState(medicao.pulso);
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const { language } = useLanguage();

  const handleSalvarEdicao = async () => {
    const novaMedicao: Medicao = {
      ...medicao,
      sistolica: sistolicaEditada,
      diastolica: diastolicaEditada,
      pulso: pulsoEditado,
    };

    try {
      setLoading(true);
      const medicoesRef = collection(db, "medicoes");

      const medicaoParaAtualizar: { [campo: string]: any } = {
        sistolica: novaMedicao.sistolica,
        diastolica: novaMedicao.diastolica,
        pulso: novaMedicao.pulso,
      };

      await updateDoc(doc(medicoesRef, medicao.id), medicaoParaAtualizar);

      setLoading(false);
      Alert.alert(language.TEXTO.ADICIONADO_COM_SUCESSO);
      salvarEdicao(novaMedicao);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao editar medição:", error);
    }
  };

  return (
    <Modal visible={visivel} transparent animationType="slide">
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: theme.COLORS.OVERLAY },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.COLORS.BACKGROUND_CARD },
          ]}
        >
          <View style={{ alignItems: "flex-end" }}>
            <AntDesign
              onPress={fecharModal}
              name="close"
              size={25}
              color={theme.COLORS.ICON}
            />
          </View>
          <Text style={[styles.textoModal, { color: theme.COLORS.POST_TITLE }]}>
            {language.TEXTO.EDITAR_MEDICAO}
          </Text>
          <TextInput
            style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
            placeholder={language.TEXTO.SISTOLICA}
            value={sistolicaEditada}
            onChangeText={(texto) => setSistolicaEditada(texto)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
            placeholder={language.TEXTO.DIASTOLICA}
            value={diastolicaEditada}
            onChangeText={(texto) => setDiastolicaEditada(texto)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
            placeholder={language.TEXTO.PULSO}
            value={pulsoEditado}
            onChangeText={(texto) => setPulsoEditado(texto)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[
              styles.botaoSalvar,
              { backgroundColor: theme.COLORS.BUTTON },
            ]}
            onPress={handleSalvarEdicao}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={"#fff"} />
            ) : (
              <Text
                style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}
              >
                {language.TEXTO.SALVAR}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEdicao;
