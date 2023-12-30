import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { criar } from '../../components/firebase';
import { StackTypes } from '../../routes/NavigationStack';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackTypes>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignUp = () => {
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    
    criar(email, password)
      .then((userCredentials) => {
        setLoading(false);
        const user = userCredentials.user;
        alert('Cadastro efetuado com sucesso!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
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

        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backToLogin}>Voltar para o Login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
