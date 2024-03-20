import { styles } from "./styles";
import MedicaoFormProps from "../../props/MedicaoFormProps";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { AntDesign } from "@expo/vector-icons";

const MedicaoForm: React.FC<MedicaoFormProps> = ({
  onMedicaoAdicionada,
  loading,
  user,
  MudarCard,
}) => {
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [pulso, setPulso] = useState("");
  const [isAddingMedicao, setIsAddingMedicao] = useState(false);

  const { theme } = useTheme();
  const { language } = useLanguage();

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
          const docRef = await addDoc(medicoesRef, novaMedicao);

          onMedicaoAdicionada();
          Alert.alert(language.TEXTO.ADICIONADO_COM_SUCESSO);
        } catch (error) {
          console.error("Erro ao adicionar medição:", error);
          alert(language.TEXTO.ERRO_MEDICAO);
        } finally {
          setIsAddingMedicao(false);
        }
      } else {
        alert(language.TEXTO.VALORES_INVALIDOS);
      }
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
          name="right"
          size={25}
          color={theme.COLORS.ICON}
        />
      </View>
      <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>
        {language.TEXTO.SISTOLICA}
      </Text>
      <TextInput
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        placeholder={language.TEXTO.DIGITE_DIASTOLICA}
        placeholderTextColor={theme.COLORS.TEXT}
        value={sistolica}
        onChangeText={(texto) => setSistolica(texto)}
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>
        {language.TEXTO.DIASTOLICA}
      </Text>
      <TextInput
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        placeholder={language.TEXTO.DIGITE_DIASTOLICA}
        placeholderTextColor={theme.COLORS.TEXT}
        value={diastolica}
        onChangeText={(texto) => setDiastolica(texto)}
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>
        {language.TEXTO.PULSO}
      </Text>
      <TextInput
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        placeholder={language.TEXTO.DIGITE_PULSO}
        placeholderTextColor={theme.COLORS.TEXT}
        value={pulso}
        onChangeText={(texto) => setPulso(texto)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[
          styles.botaoAdicionar,
          { backgroundColor: theme.COLORS.BUTTON },
        ]}
        onPress={adicionarMedicao}
        disabled={loading || isAddingMedicao}
      >
        {isAddingMedicao ? (
          <View>
            <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
          </View>
        ) : (
          <Text
            style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            {language.TEXTO.REGISTRAR}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MedicaoForm;
