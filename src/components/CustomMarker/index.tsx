import React, { FC } from 'react';
import { Callout, Marker } from 'react-native-maps';
import { View, Text } from 'react-native';
import { styles } from './styles';
import theme from '../../theme';
import CustomMarkerProps from '../../@types/CustomMarkerProps';



const CustomMarker: FC<CustomMarkerProps> = ({
  id,
  nome_hospital,
  latitude,
  longitude,
  onPress
}) => {
  return (
    <Marker
      identifier={id}
      key={id}
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      tracksViewChanges={false}
      onPress={() => onPress(latitude, longitude)} // Call onPress when marker is pressed
    >
      <View style={styles.markerWrapper}>
        <View style={[
          styles.markerBody,
          {
            backgroundColor: theme.COLORS.PRIMARY,
          },
        ]}>
          <View style={styles.markerDot}></View>
        </View>
        <View style={[
          styles.markerArrow,
          {
            borderBottomColor: theme.COLORS.PRIMARY,
          }
        ]}>
        </View>
      </View>
      <Callout style={styles.callout}>
        <View>
          <Text style={styles.title}>{nome_hospital}</Text>
        </View>
      </Callout>
    </Marker>
  );
}

export default React.memo(CustomMarker);
