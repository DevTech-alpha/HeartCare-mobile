import React from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';

export default function Home() {



    return (
        <View style={styles.container}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.containerLogo}>

            </Animatable.View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Feed</Text>


            </Animatable.View>
        </View>
    );
}
