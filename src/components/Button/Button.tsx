import React, { FC } from "react";
import {TouchableOpacity, Image} from "react-native";
import { styles } from "./styles";
import ButtonProps from "../../props/ButtonProps";


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