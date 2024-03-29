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
import { useTheme } from "../../context/ThemeContext";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  handleLogin,
  loading,
  handleForgotPassword,
}: LoginFormProps) {
  const { theme } = useTheme();
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
        Email
      </Text>
      <TextInput
        placeholder="Digite seu e-mail"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
        Senha
      </Text>
      <TextInput
        placeholder="Digite sua senha"
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
          {isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
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
            Acessar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={handleForgotPassword}
      >
        <Text style={[styles.registerText, { color: theme.COLORS.TEXT }]}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegister}>
        <Text
          style={[styles.registerText, { color: theme.COLORS.TEXT }]}
          onPress={() => navigate("SignUp")}
        >
          Não possui conta?
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
