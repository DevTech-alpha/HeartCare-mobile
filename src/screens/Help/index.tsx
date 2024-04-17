import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import FAQ from "../components/FAQ";
import Header from "../components/Header";
import AnamneseQuestionary from "../components/AnamneseQuestionary";

function Help() {
  const { theme } = useTheme();

  const [mostrar, setMostrar] = useState(true);

  const toggleChatVisibility = () => {
    setMostrar(!mostrar);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header title={mostrar ? "FAQ" : "Anamnese"} />
      {mostrar ? (
        <TouchableOpacity
          style={[
            styles.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleChatVisibility}
        >
          <MaterialIcons
            name={"question-answer"}
            size={24}
            color={theme.COLORS.POST_TITLE}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleChatVisibility}
        >
          <AntDesign name="arrowleft" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      )}
      {mostrar ? <FAQ /> : <AnamneseQuestionary />}
    </View>
  );
}
export default Help;
