import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

const Mapa = () => {
  const callEmergencyNumber = () => {
    // Exibe um alerta de confirmação antes de realizar a chamada de emergência
    Alert.alert(
      'Confirmação',
      'Deseja realmente ligar para o número de emergência?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ligar',
          onPress: () => {
            // Realiza a chamada de emergência
            Linking.openURL('tel:192');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <TouchableOpacity style={styles.mapaContainer}>
          <MapView
            style={styles.mapa}
            initialRegion={{
              latitude: -23.1285,
              longitude: -46.5500,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={{ latitude: -23.116540594377856, longitude: -46.543083335249825 }}
              title="Hospital Novo"
              description="Ponto de tratamento"
            />
            <Marker
              coordinate={{ latitude: -23.11502953938252, longitude: -46.5503655724134 }}
              title="Santa Casa de Atibaia"
              description="Ponto de tratamento"
            />
            <Marker
              coordinate={{ latitude: -23.11421903330251, longitude: -46.57045387887913 }}
              title="Albert Sabin"
              description="Ponto de tratamento"
            />
          </MapView>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={callEmergencyNumber}
          >
            <Ionicons name="ios-call" size={30} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Mapa;
