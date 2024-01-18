import { Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles';
import LoginFormProps from '../../@types/LoginFormProps';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/Models';
import theme from '../../theme';


const LoginForm: React.FC<LoginFormProps> = ({

  email,
  setEmail,
  password,
  setPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  handleLogin,
  loading,
  handleForgotPassword,
}) => {

  const { navigate } = useNavigation<propsStack>();

  return (
    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
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
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
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
          onPress={() => navigate('Cadastrar')}
        >
          Não possui uma conta? Registre-se
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default LoginForm;
