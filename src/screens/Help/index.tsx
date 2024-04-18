import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import FAQ from "../components/FAQ";
import Header from "../components/Header";
import { styles } from "./styles";
import Questionary from "../components/Questionary";

function Help() {
  const { theme } = useTheme();
  const [mostrar, setMostrar] = useState(true);

  const mudarTela = () => {
    setMostrar(!mostrar);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <Header title={mostrar ? "FAQ" : "Anamnese"} />
      {!mostrar && (
        <TouchableOpacity
          style={[styles.themeToggleButton, { backgroundColor: theme.COLORS.BACKGROUND }]}
          onPress={mudarTela}
        >
          <AntDesign name="arrowleft" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      )}
      {mostrar ? <FAQ  mudarTela={mudarTela}/> : <Questionary />}
    </View>
  );
}

export default Help;
