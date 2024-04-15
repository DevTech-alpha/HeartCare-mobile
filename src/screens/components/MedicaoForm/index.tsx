import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { styles } from "./styles";
import MedicaoFormProps from "../../../props/MedicaoFormProps";
import * as Animatable from "react-native-animatable";

export default function MedicaoForm({
  onMedicaoAdicionada,
  loading,
  user,
  MudarCard,
}: MedicaoFormProps) {
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [pulso, setPulso] = useState("");
  const [isAddingMedicao, setIsAddingMedicao] = useState(false);
  const { theme } = useTheme();

  const adicionarMedicao = async () => {
    if (
      sistolica.trim() !== "" &&
      diastolica.trim() !== "" &&
      pulso.trim() !== ""
    ) {
      const sistolicaValue = parseFloat(sistolica);
      const diastolicaValue = parseFloat(diastolica);

      if (!isNaN(sistolicaValue) && !isNaN(diastolicaValue)) {
        const novaMedicao = {
          userId: user?.uid ?? "",
          sistolica,
          diastolica,
          pulso,
          horario: new Date().toISOString(),
          data: new Date().toISOString(),
        };

        try {
          setIsAddingMedicao(true);

          const medicoesRef = collection(db, "medicoes");
          await addDoc(medicoesRef, novaMedicao);

          onMedicaoAdicionada();
          Alert.alert("Adicionado com sucesso");
        } catch (error) {
          console.error("Erro ao adicionar medição:", error);
          Alert.alert("Erro de medição");
        } finally {
          setIsAddingMedicao(false);
        }
      } else {
        Alert.alert("Valores inválidos");
      }
    }
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.container,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD },
      ]}
    >
      <View style={{ alignItems: "flex-end" }}>
        <AntDesign
          onPress={MudarCard}
          name="right"
          size={25}
          color={theme.COLORS.ICON}
        />
      </View>
      <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>
        Sistólica
      </Text>
      <TextInput
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        placeholder="Digite a sistólica"
        placeholderTextColor={theme.COLORS.TEXT}
        value={sistolica}
        onChangeText={(texto) => setSistolica(texto)}
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>
        Diastólica
      </Text>
      <TextInput
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        placeholder="Digite a diastólica"
        placeholderTextColor={theme.COLORS.TEXT}
        value={diastolica}
        onChangeText={(texto) => setDiastolica(texto)}
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>
        Pulso
      </Text>
      <TextInput
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        placeholder="Digite o pulso"
        placeholderTextColor={theme.COLORS.TEXT}
        value={pulso}
        onChangeText={(texto) => setPulso(texto)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: theme.COLORS.BUTTON },
        ]}
        onPress={adicionarMedicao}
        disabled={loading || isAddingMedicao}
      >
        {isAddingMedicao ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text style={{ color: theme.COLORS.BUTTON_TEXT, fontWeight: "bold" }}>
            Registrar
          </Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
}
