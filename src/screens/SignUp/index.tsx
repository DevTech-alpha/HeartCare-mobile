import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';
import { criar } from '../../components/firebase';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignUp = () => {
    criar(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        alert('Cadastro efetuado com sucesso!');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Faça seu cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
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


        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
