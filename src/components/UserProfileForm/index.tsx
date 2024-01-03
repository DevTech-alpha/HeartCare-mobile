import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import UserProfileFormProps from '../../props/UserProfileFormProps';

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  username,
  name,
  lastName,
  dob,
  email,
  setUsername,
  setName,
  setLastName,
  setDob,
  setEmail,
  handleSaveProfile,
  loading,
}) => {
  const handleEmailChange = (text: string) => {
    if (!email.trim()) {
      Alert.alert('Fale com o suporte', 'Entre em contato com o suporte para alterar o e-mail.');
    } else {
      setEmail(text);
    }
  };

  return (
    <View style={styles.containerForm}>
      <ScrollView>
        <Text style={styles.title}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={styles.title}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu Nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={styles.title}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu Sobrenome"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={styles.title}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua Data de Nascimento"
          onChangeText={(text) => setDob(text)}
          value={dob}
        />
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={[styles.input, { color: email.trim() ? 'gray' : 'black' }]} // Mudar a cor do texto se o e-mail não estiver vazio
          placeholder="Digite seu Email"
          onChangeText={handleEmailChange}
          value={email}
          pointerEvents={email.trim() ? 'none' : 'auto'} // Desativar a interação se o e-mail não estiver vazio
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Salvar perfil</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileForm;
