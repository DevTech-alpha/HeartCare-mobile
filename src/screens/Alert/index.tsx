import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { estilo } from "./styles";
import { AntDesign } from "@expo/vector-icons";

import FAQ from "../../components/FAQ";
import Chat from "../../components/Chat";
import { useTheme } from "../../context/ThemeContext";
import Header from "../../components/Header";

function Alert() {
  const { theme } = useTheme();

  const [mostrar, setMostrar] = useState(true);

  const toggleChatVisibility = () => {
    setMostrar(!mostrar);
  };

  return (
    <View style={[estilo.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <Header title={mostrar ? "Chat" : "FAQ"} />
      <TouchableOpacity
        style={[
          estilo.themeToggleButton,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
        onPress={toggleChatVisibility}
      >
        <AntDesign name={mostrar ? "arrowright" : "arrowleft"} size={30} color={theme.COLORS.ICON} />
      </TouchableOpacity>
      {mostrar ? <Chat /> : <FAQ />}
    </View>
  );
}

export default Alert;
