import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';
import { propsStack } from '../../routes/Models';
import { useTheme } from '../../hooks/ThemeProvider';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function Home() {
  const { navigate } = useNavigation<propsStack>();

  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>


      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={[styles.containerLogo, { backgroundColor: theme.COLORS.PRIMARY }]}>
        <Animatable.Image
          animation="zoomIn"
          source={require('../../assets/logo.png')}
          style={{ width: '50%' }}
          resizeMode="contain"
        />
      </Animatable.View>

      <TouchableOpacity style={[styles.themeToggleButton, { backgroundColor: theme.COLORS.BACKGROUND }]} onPress={() => navigate('FAQ')}>
        <AntDesign
          name="infocirlceo"
          size={30}
          color={theme.COLORS.ICON}
        />
      </TouchableOpacity>
      <Animatable.View delay={600} animation="fadeInUp" style={[styles.containerForm, { backgroundColor: theme.COLORS.BACKGROUND }]}>


        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Cuide do seu coração, a sinfonia da vida agradece.</Text>

        <TouchableOpacity style={[styles.buttonAcessar, { backgroundColor: theme.COLORS.BUTTON }]} onPress={() => navigate('Login')}>
          <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
