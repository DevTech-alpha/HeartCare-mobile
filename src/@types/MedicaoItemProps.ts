import Medicao from "../model/Medicao";

interface MedicaoItemProps {
    medicao: Medicao;
    deleteMedicao: (medicaoId: string) => void;

  }
  export default MedicaoItemProps;
