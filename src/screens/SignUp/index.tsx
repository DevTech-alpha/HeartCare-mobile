import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { propsStack } from "../../routes/types";
import CadastroForm from "../../components/SignUpForm";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function SignUp() {
  const { theme } = useTheme();

  const { signUp, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { navigate } = useNavigation<propsStack>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignUp = async () => {
    if (password !== confPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await signUp({ email, password });
      navigate("SignIn");
    } catch (error) {}
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Faça seu Cadastro</Text>
      </Animatable.View>

      <CadastroForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confPassword={confPassword}
        setConfPassword={setConfPassword}
        isPasswordVisible={isPasswordVisible}
        togglePasswordVisibility={togglePasswordVisibility}
        handleSignUp={handleSignUp}
        loading={isLoading}
      />
    </View>
  );
}

export default SignUp;
