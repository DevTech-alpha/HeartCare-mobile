import Medicao from "../model/Medicao";

interface MedicaoItemProps {
    medicao: Medicao;
    onMedicaoExcluida: () => void;
    onMedicaoEditada: (medicao: Medicao) => void;
  }
  export default MedicaoItemProps;
