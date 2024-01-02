interface BottomSheetContentProps {
    createNewPost: (title: string, content: string) => void;
    closeBottomSheet: () => void;
    loading: boolean;
  }
  export default BottomSheetContentProps;