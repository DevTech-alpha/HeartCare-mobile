import { ImageSourcePropType } from "react-native";

interface ButtonProps {
    backgroundColor?: string;
    width?: number;
    height?: number;
    icon: ImageSourcePropType;
    onPress: () => void;
 }

 export default ButtonProps;