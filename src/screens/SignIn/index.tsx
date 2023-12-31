import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { StackTypes } from '../../routes/NavigationStack';
import { logar, enviarRecuperacaoSenha } from '../../components/firebase';

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

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        {showResetPassword ? (
          <>
            <Text style={styles.title}>Esqueceu a senha?</Text>
            <TextInput
              placeholder="Digite seu Email para recuperação"
              value={resetEmail}
              style={styles.input}
              onChangeText={(text) => setResetEmail(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Recuperar Senha</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRegister} onPress={handleBackToLogin}>
              <Text style={styles.registerText}>Voltar para o login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Email</Text>
            <TextInput
              placeholder="Digite seu Email"
              value={email}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.title}>Senha</Text>
            <TextInput
              placeholder="Sua senha"
              style={styles.input}
              value={password}
              secureTextEntry={!isPasswordVisible}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordButton}>
              <Text style={styles.togglePasswordButtonText}>
                {isPasswordVisible ? 'Ocultar Senha' : 'Mostrar Senha'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Acessar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister} onPress={handleForgotPassword}>
              <Text style={styles.registerText}>Esqueceu a senha? Clique aqui.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister}>
              <Text
                style={styles.registerText}
                onPress={() => navigation.navigate('Cadastrar')}
              >
                Não possui uma conta? Cadastre-se
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Animatable.View>
    </View>
  );
};

export default Login;
