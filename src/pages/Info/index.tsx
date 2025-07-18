import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView, { Marker } from 'react-native-maps';
import ReturnButton from '../../components/ReturnButtom';
import ButtomMap from '../../components/ButtomMap';
import BottomSheet from '../../components/BottomSheet';
import { useState } from 'react';

type Coordinate = { latitude: number; longitude: number } | null;

export default function Info() {
  const stles = stylesCollections();

  const [marker, setMarker] = useState<Coordinate>(null);
  const [infoPoint, setInfoPoint] = useState<Coordinate>(null);

  function clickOnMap(event: any) {
    // Functionality to handle map click can be added here
    console.log('Map clicked', event);
    const { coordinate } = event.nativeEvent;
    setMarker(coordinate);
    setInfoPoint(coordinate);
  }

  return (
    <View style={stles.container}>
      <MapView
        style={stles.map}
        mapType="satellite"
        onPress={event => {
          clickOnMap(event);
        }}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <ReturnButton />
      <BottomSheet
        title="Info"
        description={
          infoPoint
            ? `Latitude: ${infoPoint.latitude}, Longitude: ${infoPoint.longitude}`
            : ''
        }
      />
    </View>
  );
}
