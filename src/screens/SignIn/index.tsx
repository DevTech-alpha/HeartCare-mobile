import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginForm from '../../components/SignInForm';
import ResetPasswordForm from '../../components/ResetPassword';
import { styles } from './styles';
import { StackTypes } from '../../routes/NavigationStack';

import * as Animatable from 'react-native-animatable';
import { logar } from '../../api/LogInToAccount';
import { enviarRecuperacaoSenha } from '../../api/PasswordRecovery';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const navigation = useNavigation<StackTypes>();

  const handleLogin = () => {
    setLoading(true);
    logar(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setLoading(false);
        navigation.navigate('Principal');
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  const handleResetPassword = () => {
    setLoading(true);
    enviarRecuperacaoSenha(resetEmail)
      .then(() => {
        setLoading(false);
        alert('Um email de recuperação de senha foi enviado.');
      })
      .catch((error: { message: any; }) => {
        setLoading(false);
        alert(error.message);
      });
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
        <Text style={styles.message}>Bem-vindo(a)</Text>
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
