import React from 'react';
import { Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles';
import ResetPasswordFormProps from '../../@types/ResetPassowordProps';
import theme from '../../theme';


const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  resetEmail,
  setResetEmail,
  handleResetPassword,
  loading,
  handleBackToLogin,
}) => {
  return (
    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
      <Text style={styles.title}>Esqueceu a senha?</Text>
      <TextInput
        placeholder="Digite seu Email para recuperação"
        value={resetEmail}
        style={styles.input}
        onChangeText={(text) => setResetEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text style={styles.buttonText}>Recuperar Senha</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegister} onPress={handleBackToLogin}>
        <Text style={styles.registerText}>Voltar para o login</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ResetPasswordForm;
