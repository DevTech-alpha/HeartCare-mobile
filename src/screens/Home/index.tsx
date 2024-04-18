import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";
import { propsStack } from "../../routes/types";
import { useTheme } from "../../context/ThemeContext";

const Img = require("../../assets/home-page.png");

function Home() {
  const { navigate } = useNavigation<propsStack>();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <View style={{ padding: 25 }}>
        <Image source={Img} style={{ width: 350, height: 300 }} />
      </View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={[
          styles.containerForm,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
      >
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Cuide do seu coração
        </Text>
        <Text style={{ color: theme.COLORS.POST_TITLE }}>
          Faça login para começar
        </Text>

        <TouchableOpacity
          style={[
            styles.buttonAcessar,
            { backgroundColor: theme.COLORS.BUTTON },
          ]}
          onPress={() => navigate("SignIn")}
        >
          <AntDesign name="arrowright" size={30} color={theme.COLORS.WHITE} />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

export default Home;
