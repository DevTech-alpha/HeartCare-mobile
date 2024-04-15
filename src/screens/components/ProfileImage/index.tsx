import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import ProfileImageProps from "../../../props/ProfileImageProps";

export default function ProfileImage({ photo, onPress }: ProfileImageProps) {
  return (
    <TouchableOpacity style={styles.profileImageContainer} onPress={onPress}>
      <Image
        source={photo ? { uri: photo } : require("../../../assets/user.png")}
        style={styles.profileImage}
        defaultSource={require("../../../assets/user.png")}
      />
    </TouchableOpacity>
  );
}
