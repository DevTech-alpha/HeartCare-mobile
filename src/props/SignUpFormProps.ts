interface SignUpFormProps {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  confPassword: string;
  setConfPassword: (text: string) => void;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  handleSignUp: () => void;
  loading: boolean;
}

export default SignUpFormProps;
