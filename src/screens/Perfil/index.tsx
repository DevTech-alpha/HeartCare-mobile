import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../../firebase';
import { StackTypes } from '../../routes/NavigationStack';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles';

const HomeScreen = () => {
  const navigation = useNavigation<StackTypes>();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

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
        <Text style={styles.text}>Email: {auth.currentUser?.email}</Text>

        <TouchableOpacity style={styles.buttonAcessar} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default HomeScreen;
