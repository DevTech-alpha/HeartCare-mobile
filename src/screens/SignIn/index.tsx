import React, { useState } from "react";
import { View, Text } from "react-native";
import LoginForm from "../../components/SignInForm";
import ResetPasswordForm from "../../components/ResetPassword";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import { enviarRecuperacaoSenha } from "../../api/PasswordRecovery";
import { useAuth } from "../../hooks/AuthProvider";
import { useTheme } from "../../hooks/ThemeProvider";
import { useLanguage } from "../../hooks/LanguageProvider";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const { theme } = useTheme();
  const { language } = useLanguage();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn({ email, password });
    } catch (error) {
      console.error("Erro durante o login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await enviarRecuperacaoSenha(resetEmail);
      setLoading(false);
      alert("Um e-mail de recuperação de senha foi enviado.");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleForgotPassword = () => {
    setShowResetPassword(true);
  };

  const handleBackToLogin = () => {
    setShowResetPassword(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>{language.TEXTO.BEM_VINDO}</Text>
      </Animatable.View>

      {showResetPassword ? (
        <ResetPasswordForm
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
          handleResetPassword={handleResetPassword}
          loading={loading}
          handleBackToLogin={handleBackToLogin}
        />
      ) : (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isPasswordVisible={isPasswordVisible}
          togglePasswordVisibility={togglePasswordVisibility}
          handleLogin={handleLogin}
          loading={loading}
          handleForgotPassword={handleForgotPassword}
        />
      )}
    </View>
  );
};

export default Login;
