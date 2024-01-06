import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginForm from '../../components/SignInForm';
import ResetPasswordForm from '../../components/ResetPassword';
import { styles } from './styles';

import * as Animatable from 'react-native-animatable';
import { logar } from '../../api/LogInToAccount';
import { enviarRecuperacaoSenha } from '../../api/PasswordRecovery';
import { propsStack } from '../../routes/Models';
import { useAuth } from '../../hooks/Auth';

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const { navigate } = useNavigation<propsStack>();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn({ email, password });
    } catch (error) {
      console.error('Erro durante o login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await enviarRecuperacaoSenha(resetEmail);
      setLoading(false);
      alert('Um e-mail de recuperação de senha foi enviado.');
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
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>𝓑𝓮𝓶-𝓿𝓲𝓷𝓭𝓸(𝓪)</Text>
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
