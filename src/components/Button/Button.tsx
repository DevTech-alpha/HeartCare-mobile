import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { styles } from "./styles";

interface ButtonProps {
   backgroundColor?: string;
   width?: number;
   height?: number;
   icon: ImageSourcePropType;
   onPress: () => void;
}

const Button: FC<ButtonProps> = ({
   backgroundColor = '#fff', 
   width = 50, 
   height = 50,
   icon,
   onPress
}) => {
   return (
      <TouchableOpacity
         style={[
            styles.mapButton, 
            {
               backgroundColor: backgroundColor, 
               height: height, 
               width: width 
            }
         ]}
         onPress={onPress}
      >
         <Image style={styles.icon} source={icon} />
      </TouchableOpacity>
   );
}

export default Button;
