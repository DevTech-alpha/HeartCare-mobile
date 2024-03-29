import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import ProfileImageProps from "../../props/ProfileImageProps";

export default function ProfileImage({ photo, onPress }: ProfileImageProps) {
  return (
    <TouchableOpacity style={styles.profileImageContainer} onPress={onPress}>
      {photo && photo !== "" ? (
        <Image source={{ uri: photo }} style={styles.profileImage} />
      ) : (
        <Image
          source={require("../../assets/user.png")}
          style={styles.profileImage}
        />
      )}
    </TouchableOpacity>
  );
}
