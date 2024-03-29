import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { criar } from "../../api/CreateAcount";
import { propsStack } from "../../routes/Models";
import CadastroForm from "../../components/SignUpForm";
import { useTheme } from "../../context/ThemeContext";

function SignUp() {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<propsStack>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignUp = () => {
    setLoading(true);

    if (password !== confPassword) {
      setLoading(false);
      Alert.alert("Senha não corresponde");
      return;
    }

    criar(email, password)
      .then((userCredentials) => {
        setLoading(false);
        const user = userCredentials.user;
        Alert.alert("Registro bem-sucedido");
        navigate("SignIn");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
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
        loading={loading}
      />
    </View>
  );
};

export default SignUp;
