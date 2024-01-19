interface CustomMarkerProps {
    id: string;
    nome_hospital: string,
    latitude: number;
    longitude: number;
    onPress: (latitude: number, longitude: number) => void; // Add onPress property
  }

export default CustomMarkerProps;