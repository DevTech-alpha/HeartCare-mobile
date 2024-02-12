import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/ThemeProvider';
import { styles } from './styles';
import CadastroFormProps from '../../props/SignUpFormProps';



const CadastroForm: React.FC<CadastroFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confPassword,
  setConfPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  handleSignUp,
  loading
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.containerForm, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Email</Text>
      <TextInput
        placeholder="Digite seu Email"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        value={password}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setPassword(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Confirme a Senha</Text>
      <TextInput
        placeholder="Digite sua confirmação de senha"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
        value={confPassword}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setConfPassword(text)}
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
    </View>
  );
};

export default CadastroForm;
