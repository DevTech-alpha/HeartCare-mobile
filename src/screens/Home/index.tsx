import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import { styles } from "./styles";
import { propsStack } from "../../routes/types";
import { useTheme } from "../../context/ThemeContext";

import ImgHome from "../../assets/svg/home-page.svg";
import { AntDesign } from "@expo/vector-icons";

function Home() {
  const { navigate } = useNavigation<propsStack>();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <View style={{ padding: 15 }}>
        <ImgHome width={350} height={300} />
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
        <Text style={[styles.text, { color: theme.COLORS.POST_TITLE }]}>
          Faça login para começar
        </Text>

        <TouchableOpacity
          style={[
            styles.buttonAcessar,
            { backgroundColor: theme.COLORS.BUTTON },
          ]}
          onPress={() => navigate("SignIn")}
        >
          <AntDesign
            name="arrowright"
            size={30}
            color={theme.COLORS.ICON}
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

export default Home;
