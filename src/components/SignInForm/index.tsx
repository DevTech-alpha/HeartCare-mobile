import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { styles } from "./styles";
import LoginFormProps from "../../props/SignInFormProps";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Models";
import { useTheme } from "../../hooks/ThemeProvider";
import { useLanguage } from "../../hooks/LanguageProvider";

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  handleLogin,
  loading,
  handleForgotPassword,
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { navigate } = useNavigation<propsStack>();

  return (
    <Animatable.View
      animation="fadeInUp"
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
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
        {language.TEXTO.SENHA}
      </Text>
      <TextInput
        placeholder={language.TEXTO.DIGITE_SENHA}
        placeholderTextColor={theme.COLORS.TEXT}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        value={password}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setPassword(text)}
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
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            {language.TEXTO.ACESSAR}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={handleForgotPassword}
      >
        <Text style={[styles.registerText, { color: theme.COLORS.TEXT }]}>
          {language.TEXTO.ESQUECEU_SENHA}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegister}>
        <Text
          style={[styles.registerText, { color: theme.COLORS.TEXT }]}
          onPress={() => navigate("Cadastrar")}
        >
          {language.TEXTO.NAO_POSSUI_CONTA}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default LoginForm;
