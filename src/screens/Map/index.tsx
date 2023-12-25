import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';

const Mapa = () => {
    const [mapaExpandido, setMapaExpandido] = useState(false);

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Mapa</Text>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <TouchableOpacity style={styles.mapaContainer}>
                    <MapView
                        style={mapaExpandido ? styles.mapaExpandido : styles.mapaPequeno}
                        initialRegion={{
                            latitude: -23.1285,
                            longitude: -46.5500,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                    >
                        {/* Marcador para o ponto "Hospital Novo" */}
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
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

export default Mapa;
