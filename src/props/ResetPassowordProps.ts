interface ResetPasswordFormProps {
  resetEmail: string;
  setResetEmail: (email: string) => void;
  handleResetPassword: () => void;
  loading: boolean;
  handleBackToLogin: () => void;
}

export default ResetPasswordFormProps;
