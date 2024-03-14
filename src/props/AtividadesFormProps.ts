import { User } from "firebase/auth";

interface AtividadesFormProps {
  user: User;
  MudarCard: () => void;
}
export default AtividadesFormProps;
