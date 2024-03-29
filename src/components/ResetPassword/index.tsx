import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { styles } from "./styles";
import ResetPasswordFormProps from "../../props/ResetPassowordProps";
import { useTheme } from "../../context/ThemeContext";

export default function ResetPasswordForm({
  resetEmail,
  setResetEmail,
  handleResetPassword,
  loading,
  handleBackToLogin,
}: ResetPasswordFormProps) {
  const { theme } = useTheme();

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND },
      ]}
    >
      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
        Recuperar Senha
      </Text>
      <TextInput
        placeholder="Digite seu e-mail"
        placeholderTextColor={theme.COLORS.TEXT}
        value={resetEmail}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        onChangeText={(text) => setResetEmail(text)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Recuperar Senha
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={handleBackToLogin}
      >
        <Text style={[styles.registerText, { color: theme.COLORS.TEXT }]}>
          Voltar ao Login
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
