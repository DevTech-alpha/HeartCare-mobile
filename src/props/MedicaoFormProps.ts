import { User } from "firebase/auth";

interface MedicaoFormProps {
  onMedicaoAdicionada: () => void;
  loading: boolean;
  user: User;
  MudarCard: () => void;
}
export default MedicaoFormProps;
