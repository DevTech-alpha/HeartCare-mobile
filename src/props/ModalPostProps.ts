
interface ModalPostProps {
  fecharModal: () => void;
  createNewPost: (title: string, content: string) => void;
  loading: boolean;
  visivel: boolean;

}
export default ModalPostProps;