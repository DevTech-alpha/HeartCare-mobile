import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { StackTypes } from '../../routes/NavigationStack';

import AuthContext from '../../components/AuthContent';
import Users from '../../model/User';

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const authContext = useContext(AuthContext);
  const navigation = useNavigation<StackTypes>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const textInputChange = (val: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val: string) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const loginHandle = () => {
    const foundUser = Users.filter((item) => {
      return data.username === item.username && data.password === item.password;
    });

    if (data.username.length === 0 || data.password.length === 0) {
      alert('Entrada Inválida! O campo de nome de usuário ou senha não pode ficar vazio.');
      return;
    }

    if (foundUser.length === 0) {
      alert('Usuário Inválido! Nome de usuário ou senha está incorreto.');
      return;
    }

    authContext?.signIn(foundUser);
    navigation.navigate('Principal');
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Usuario</Text>
        <TextInput
          placeholder="Digite seu Usuario"
          style={styles.input}
          onChangeText={(val) => textInputChange(val)}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Sua senha"
          style={styles.input}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordButton}>
          <Text style={styles.togglePasswordButtonText}>
            {isPasswordVisible ? 'Ocultar Senha' : 'Mostrar Senha'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={loginHandle}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText} onPress={() => navigation.navigate('Cadastrar')}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default Login;
