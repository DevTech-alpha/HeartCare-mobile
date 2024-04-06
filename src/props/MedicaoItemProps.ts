import Medicao from "../models/Medicao";

interface MedicaoItemProps {
  medicao: Medicao;
  deleteMedicao: (medicaoId: string) => void;
}

export default MedicaoItemProps;
