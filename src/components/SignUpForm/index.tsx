import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../hooks/ThemeProvider";
import { styles } from "./styles";
import CadastroFormProps from "../../props/SignUpFormProps";
import { useLanguage } from "../../hooks/LanguageProvider";

const CadastroForm: React.FC<CadastroFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confPassword,
  setConfPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  handleSignUp,
  loading,
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <View
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND },
      ]}
    >
      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
        {language.TEXTO.EMAIL}
      </Text>
      <TextInput
        placeholder={language.TEXTO.DIGITE_SEU_EMAIL}
        placeholderTextColor={theme.COLORS.TEXT}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
        {language.TEXTO.SENHA}
      </Text>
      <TextInput
        placeholder={language.TEXTO.DIGITE_SUA_SENHA}
        placeholderTextColor={theme.COLORS.TEXT}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        value={password}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setPassword(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
        {language.TEXTO.CONFIRME_A_SENHA}
      </Text>
      <TextInput
        placeholder={language.TEXTO.DIGITE_SUA_CONFIRMACAO_DE_SENHA}
        placeholderTextColor={theme.COLORS.TEXT}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        value={confPassword}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setConfPassword(text)}
      />

      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.togglePasswordButton}
      >
        <Text
          style={[
            styles.togglePasswordButtonText,
            { color: theme.COLORS.TEXT },
          ]}
        >
          {isPasswordVisible
            ? language.TEXTO.OCULTAR_SENHA
            : language.TEXTO.MOSTRAR_SENHA}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            {language.TEXTO.REGISTRAR}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CadastroForm;
