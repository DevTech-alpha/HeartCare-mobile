import Medicao from "../model/Medicao";

interface MedicaoItemProps {
    medicao: Medicao;
    deleteMedicao: (medicaoId: number) => void;

  }
  export default MedicaoItemProps;
