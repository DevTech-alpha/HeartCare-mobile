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
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Medicao from "../../models/Medicao";
import ModalEdicaoProps from "../../props/ModalEditProps";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./styles";

export default function ModalEdicao({
  visivel,
  fecharModal,
  medicao,
  salvarEdicao,
}: ModalEdicaoProps) {
  const [sistolicaEditada, setSistolicaEditada] = useState(medicao.sistolica);
  const [diastolicaEditada, setDiastolicaEditada] = useState(
    medicao.diastolica
  );
  const [pulsoEditado, setPulsoEditado] = useState(medicao.pulso);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

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

      const medicaoParaAtualizar = {
        sistolica: novaMedicao.sistolica,
        diastolica: novaMedicao.diastolica,
        pulso: novaMedicao.pulso,
      };

      await updateDoc(doc(medicoesRef, medicao.id), medicaoParaAtualizar);

      setLoading(false);
      Alert.alert("Editado com sucesso");
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
            { backgroundColor: theme.COLORS.BACKGROUND },
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
            Editar Medição
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.POST_CONTENT,
              },
            ]}
            placeholder="Sistólica"
            value={sistolicaEditada}
            onChangeText={(texto) => setSistolicaEditada(texto)}
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.POST_CONTENT,
              },
            ]}
            placeholder="Diastólica"
            value={diastolicaEditada}
            onChangeText={(texto) => setDiastolicaEditada(texto)}
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.POST_CONTENT,
              },
            ]}
            placeholder="Pulso"
            value={pulsoEditado}
            onChangeText={(texto) => setPulsoEditado(texto)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: theme.COLORS.PRIMARY},
            ]}
            onPress={handleSalvarEdicao}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={[styles.textoBotao, { color: theme.COLORS.TEXT }]}
              >
                Salvar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
