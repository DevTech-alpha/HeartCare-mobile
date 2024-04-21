import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";
import { styles } from "./styles";
import Duvidas from "../components/Duvidas";
import AnamneseQuestionary from "../components/AnamneseQuestionary";

function Info() {
  const { theme } = useTheme();
  const [mostrar, setMostrar] = useState(true);

  const toggleScreen = () => {
    setMostrar(!mostrar);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
    <Header title={mostrar ? "Dúvidas" : "Anamnese"} />
      {!mostrar && (
        <TouchableOpacity
          style={[styles.mudarTela, { backgroundColor: theme.COLORS.BACKGROUND }]}
          onPress={toggleScreen}
        >
          <AntDesign name="arrowleft" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      )}
      {mostrar ? <Duvidas  toggleScreen={toggleScreen}/> : <AnamneseQuestionary />}
    </View>
  );
}

export default Info;
