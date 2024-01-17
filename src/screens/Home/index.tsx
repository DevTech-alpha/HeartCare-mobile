import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

import { styles } from './styles';
import { propsStack } from '../../routes/Models';
import theme from '../../theme';

export default function Home() {
  const { navigate } = useNavigation<propsStack>();

  return (
    <View style={styles.container}>
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.containerLogo}>
        <Animatable.Image
          animation="zoomIn"
          source={require('../../assets/logo.png')}
          style={{ width: '100%' }}
          resizeMode="contain"
        />
      </Animatable.View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Cuide do seu coração, a sinfonia da vida agradece.</Text>
        <Text style={styles.text}>
          Veja algumas maneiras de cuidar da sua saúde
          <TouchableOpacity onPress={() => navigate('Perguntas')}>
            <FontAwesome name="info-circle" size={20} color={theme.COLORS.ICON} />
          </TouchableOpacity>
        </Text>

        <TouchableOpacity style={styles.buttonAcessar} onPress={() => navigate('Login')}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
