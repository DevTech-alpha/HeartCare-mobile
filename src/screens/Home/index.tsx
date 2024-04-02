import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import { styles } from "./styles";
import { propsStack } from "../../routes/Models";
import { useTheme } from "../../context/ThemeContext";

function Home() {
  const { navigate } = useNavigation<propsStack>();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <Animatable.View
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={[
          styles.containerLogo,
          { backgroundColor: theme.COLORS.PRIMARY },
        ]}
      >
        <Animatable.Image
          animation="zoomIn"
          source={require("../../assets/logo.png")}
          style={{ width: "50%" }}
          resizeMode="contain"
        />
      </Animatable.View>
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
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Acessar
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
export default Home;
