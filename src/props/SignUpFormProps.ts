interface CadastroFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confPassword: string;
  setConfPassword: React.Dispatch<React.SetStateAction<string>>;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  handleSignUp: () => void;
  loading: boolean;
}

export default CadastroFormProps;