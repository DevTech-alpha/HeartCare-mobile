import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { criar } from '../../api/CreateAcount';
import { propsStack } from '../../routes/Models';

import { useTheme } from '../../hooks/ThemeProvider';


export default function Cadastro() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<propsStack>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignUp = () => {
    setLoading(true);

    criar(email, password)
      .then((userCredentials) => {
        setLoading(false);
        const user = userCredentials.user;
        alert('Registro realizado com sucesso!');
        navigate('Login');
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>𝓕𝓪𝓬̧𝓪 𝓼𝓮𝓾 𝓬𝓪𝓭𝓪𝓼𝓽𝓻𝓸</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={[styles.containerForm, { backgroundColor: theme.COLORS.BACKGROUND }]}>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Email</Text>
        <TextInput
          placeholder="Digite seu Email"
          placeholderTextColor={theme.COLORS.TEXT}
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor={theme.COLORS.TEXT}
          style={styles.input}
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordButton}>
          <Text style={[styles.togglePasswordButtonText, { color: theme.COLORS.TEXT }]}>
            {isPasswordVisible ? 'Ocultar Senha' : 'Mostrar Senha'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]} onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>Registrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={[styles.backToLogin, { color: theme.COLORS.TEXT }]}>Voltar para o Login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
