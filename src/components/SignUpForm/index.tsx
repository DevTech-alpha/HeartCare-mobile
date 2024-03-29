import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import CadastroFormProps from "../../props/SignUpFormProps";
import { useTheme } from "../../context/ThemeContext";

export default function CadastroForm({
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
}: CadastroFormProps) {
  const { theme } = useTheme();

  return (
    <View
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
        value={email}
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

      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
        Confirme a Senha
      </Text>
      <TextInput
        placeholder="Digite sua confirmação de senha"
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
          {isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
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
            Registrar
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
