import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTheme } from "../../hooks/ThemeProvider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { styles } from "./styles";
import { Checkbox } from "expo-checkbox";
import AtividadesFormProps from "../../props/AtividadesFormProps";
import { AntDesign } from "@expo/vector-icons";
import { useLanguage } from "../../hooks/LanguageProvider";

const AtividadesForm: React.FC<AtividadesFormProps> = ({ user, MudarCard }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [tempoInput, setTempoInput] = useState("");
  const [atividadeSelecionada, setAtividadeSelecionada] = useState("");

  const atividadesDisponiveis = ["Ciclismo", "Caminhada", "Yoga"];

  const toggleCheckBox = (atividade: string) => {
    setAtividadeSelecionada(
      atividade === atividadeSelecionada ? "" : atividade
    );
  };

  const limparFormulario = () => {
    setTempoInput("");
    setAtividadeSelecionada("");
  };

  const registrarAtividade = async () => {
    try {
      if (!atividadeSelecionada || !tempoInput) {
        Alert.alert(language.TEXTO.MENSAGEM_TEMPO);
        return;
      }

      const tempo = parseFloat(tempoInput);

      if (tempo <= 0 || tempo > 120) {
        Alert.alert(language.TEXTO.MENSAGEM_TEMPO_MAIOR);
        return;
      }

      setLoading(true);
      await addDoc(collection(db, "atividades"), {
        Modalidade: atividadeSelecionada,
        Tempo: tempo,
        Usuario: user.uid,
      });
      setLoading(false);
      Alert.alert(language.TEXTO.ADICIONADO_COM_SUCESSO);
      limparFormulario();
    } catch (error) {
      console.error("Erro ao registrar atividade:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD },
      ]}
    >
      <View style={{ alignItems: "flex-end" }}>
        <AntDesign
          onPress={MudarCard}
          name="left"
          size={25}
          color={theme.COLORS.ICON}
        />
      </View>
      {atividadesDisponiveis.map((atividade, index) => (
        <TouchableOpacity key={index} onPress={() => toggleCheckBox(atividade)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              value={atividade === atividadeSelecionada}
              onValueChange={() => toggleCheckBox(atividade)}
              color={theme.COLORS.PRIMARY}
              style={styles.checkbox}
            />
            <Text style={[{ color: theme.COLORS.POST_CONTENT }]}>
              {atividade}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>
        {language.TEXTO.TEMPO_DO_EXERCICIO}
      </Text>
      <TextInput
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        placeholderTextColor={theme.COLORS.POST_CONTENT}
        onChangeText={setTempoInput}
        value={tempoInput}
        placeholder={language.TEXTO.TEMPO_EM_MINUTOS}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[
          styles.botaoAdicionar,
          { backgroundColor: theme.COLORS.BUTTON },
        ]}
        onPress={registrarAtividade}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.BUTTON_TEXT} />
        ) : (
          <Text style={[{ color: theme.COLORS.BUTTON_TEXT }]}>
            {language.TEXTO.REGISTRAR}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AtividadesForm;
