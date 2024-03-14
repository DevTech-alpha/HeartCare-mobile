interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  handleLogin: () => void;
  loading: boolean;
  handleForgotPassword: () => void;
}
export default LoginFormProps;
