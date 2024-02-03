import Medicao from "../model/Medicao";

interface ModalEdicaoProps {
  visivel: boolean;
  fecharModal: () => void;
  medicao: Medicao;
  salvarEdicao: (novaMedicao: Medicao) => void;
}
export default ModalEdicaoProps;