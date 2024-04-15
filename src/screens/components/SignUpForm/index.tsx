import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../../routes/types";
import { styles } from "./styles";
import SignUpFormProps from "../../../props/SignUpFormProps";

export default function SignUpForm({
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
}: SignUpFormProps) {
  const { theme } = useTheme();
  const { navigate } = useNavigation<propsStack>();

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
        style={[
          styles.input,
          {
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
            color: theme.COLORS.POST_CONTENT,
          },
        ]}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
        Senha
      </Text>
      <TextInput
        placeholder="Digite sua senha"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[
          styles.input,
          {
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
            color: theme.COLORS.POST_CONTENT,
          },
        ]}
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
        style={[
          styles.input,
          {
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
            color: theme.COLORS.POST_CONTENT,
          },
        ]}
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
      <TouchableOpacity
        onPress={() => navigate("SignIn")}
        style={[styles.buttonRegister, { borderColor: theme.COLORS.PRIMARY }]}
      >
        <Text style={[styles.buttonText, { color: theme.COLORS.TEXT }]}>
          Já possui conta?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
