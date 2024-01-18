import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Dimensions } from "react-native";
import MapView, { Details, LatLng } from "react-native-maps";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import MapViewDirections, { MapDirectionsResponse } from "react-native-maps-directions";
import CustomMarker from "../../components/CustomMarker";
import Button from "../../components/Button/Button";
import { styles } from "./styles";
import { Header } from "../../components/Header";

interface Camera {
   center: LatLng;
   pitch: number;
   heading: number;
   altitude: number;
   zoom: number;
}

const Map: React.FC = () => {
   const APIKEY = "AIzaSyCFLIp4Js-CeTFakpLJ4CxdtSqmPtQy1vw";

   const [camera, setCamera] = useState<Camera>({
      center: {
         latitude: 0,
         longitude: 0
      },
      pitch: 0,
      heading: 0,
      altitude: 1000,
      zoom: 16,
   });

   const [selectedDestination, setSelectedDestination] = useState<LatLng | null>(null);
   const [destinationLocation, setDestinationLocation] = useState<LatLng | null>(null);
   const [mapReady, setMapReady] = useState(false);
   const [shouldFitMarkers, setShouldFitMarkers] = useState(true);
   const [followUserLocation, setFollowUserLocation] = useState(true);

   const mapRef = useRef<MapView>(null);
   const { width, height } = Dimensions.get('window');

   useEffect(() => {
      const startTracking = async () => {
         let { status } = await requestForegroundPermissionsAsync();
         if (status !== 'granted') {
            alert('Permissões para acessar a localização foram negadas.');
            return;
         }
         try {
            await watchPositionAsync({
               accuracy: Accuracy.Highest,
               timeInterval: 5000,
               distanceInterval: 10,
            }, (loc) => {
               setCamera(prevCamera => ({
                  ...prevCamera,
                  center: {
                     latitude: loc.coords.latitude,
                     longitude: loc.coords.longitude,
                  }
               }));
            });
         } catch (err) {
            console.warn('Algo deu errado...')
         }
      }
      startTracking();
   }, []);

   const selectDestination = (latitude: number, longitude: number) => {
      setSelectedDestination({
         latitude,
         longitude,
      });
   }

   const getDirections = () => {
      setDestinationLocation(selectedDestination);
      setShouldFitMarkers(true);
      setFollowUserLocation(false);
   }

   const removeDirections = () => {
      setDestinationLocation(null);
      setSelectedDestination(null);
   }

   const handleMapReady = useCallback(() => {
      setMapReady(true);
   }, [mapRef, setMapReady]);

   const handleMapCamera = async ({ isGesture }: { isGesture: Details }) => {
      const cameraRef = await mapRef.current?.getCamera();
      if (cameraRef) {
         setCamera(prevCamera => ({
            ...prevCamera,
            heading: cameraRef.heading || 0,
            pitch: cameraRef.pitch || 0,
            altitude: cameraRef.altitude || 0,
            zoom: cameraRef.zoom || 0,
         }));
         if (followUserLocation && isGesture) {
            setFollowUserLocation(false);
         }
      }
   }


   const handleFollowUserLocation = () => {
      if (mapRef.current) {
         mapRef.current.animateCamera({
            center: {
               latitude: camera.center.latitude,
               longitude: camera.center.longitude,
            },
            pitch: camera.pitch,
            heading: camera.heading,
            altitude: camera.altitude,
            zoom: camera.zoom <= 13 ? 17 : camera.zoom,
         }, { duration: 2000 });
      }
      setTimeout(() => {
         setFollowUserLocation(true);
      }, 3000)
   }

   return (
      <><Header title="𝓜𝓪𝓹𝓪"/><View style={styles.container}>

         <>
            <MapView
               style={styles.map}
               camera={followUserLocation ? camera : undefined}
               showsUserLocation={true}
               showsMyLocationButton={false}
               zoomControlEnabled={true}
               loadingEnabled={true}
               loadingBackgroundColor={'#fff'}
               toolbarEnabled={false}
               ref={mapRef}
               onMapReady={handleMapReady}
               onRegionChangeComplete={(region, isGesture) => handleMapCamera({ isGesture })}
               onPress={!destinationLocation ? () => setSelectedDestination(null) : undefined}
            >
               <CustomMarker
                  latitude={-23.116678758774682}
                  longitude={-46.543051121631414}
                  id={'1'}
                  onPress={selectDestination} nome_hospital={"Hospital Novo Atibaia"} />
               <CustomMarker
                  latitude={-22.901000265403088}
                  longitude={-47.055541178183695}
                  id={'2'}
                  onPress={selectDestination} nome_hospital={"Hospital do Coração de Campinas"} />


               <CustomMarker
                  latitude={-23.114120357489963}
                  longitude={-46.5710546935175}
                  id={'3'}
                  onPress={selectDestination} nome_hospital={"Albert Sabin Hospital e Maternidade"} />


               <CustomMarker
                  latitude={-23.114833828779346}
                  longitude={-46.55028932050007}
                  id={'4'}
                  onPress={selectDestination} nome_hospital={"Santa Casa de Atibaia-SP"} />


               <CustomMarker
                  latitude={-25.46296370421229}
                  longitude={-49.299672664551984}
                  id={'5'}
                  onPress={selectDestination} nome_hospital={"Hospital Cardiológico Costantini"} />

               {destinationLocation && (
                  <MapViewDirections
                     origin={camera.center}
                     destination={destinationLocation}
                     apikey={APIKEY}
                     strokeWidth={3}
                     strokeColor="#4285F4"
                     lineDashPattern={[0]}
                     optimizeWaypoints={true}
                     resetOnChange={false}
                     precision={'high'}
                     onError={(errorMessage) => {
                        alert('Erro ao obter direções...');
                     } }
                     onReady={(result: MapDirectionsResponse) => {
                        if (shouldFitMarkers) {
                           mapRef.current?.fitToCoordinates(result.coordinates, {
                              edgePadding: {
                                 right: (width / 10),
                                 bottom: (height / 10),
                                 left: (width / 10),
                                 top: (height / 10),
                              }
                           });
                           setShouldFitMarkers(false);
                        }
                     } } />
               )}
            </MapView>
            <View style={styles.buttonWrapper}>
               {selectedDestination && destinationLocation && (
                  <Button
                     backgroundColor={'#DB4437'}
                     height={40}
                     width={40}
                     icon={require('../../assets/clear.png')}
                     onPress={() => removeDirections()} />
               )}
               {selectedDestination && (
                  <Button
                     backgroundColor={'#4285F4'}
                     icon={require('../../assets/directions.png')}
                     onPress={() => getDirections()} />
               )}
               <Button
                  icon={require('../..//assets/my-location.png')}
                  onPress={() => handleFollowUserLocation()} />

            </View>
         </>
      </View></>
   );
}

export default Map;
