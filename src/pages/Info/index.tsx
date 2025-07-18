import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView, { MapType, Marker } from 'react-native-maps';
import ReturnButton from '../../components/ReturnButtom';
import ButtomMap from '../../components/ButtomMap';
import BottomSheet from '../../components/BottomSheet';
import { useRef, useState } from 'react';

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
  const mapRef = useRef<MapView>(null);
  const [layer, setLayer] = useState<MapType>('satellite');
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  function clearData() {
    setMarker(null);
    setInfoPoint(null);
  }

  function changeLayer(layer: MapType) {
    setLayer(layer);
  }

  function centerUser() {
    console.log('Centering user location');
    // Implement user centering logic if needed
  }

  function userMoves(event: any) {
    const { coordinate } = event.nativeEvent;
    setUserLocation(coordinate);
  }

  return (
    <View style={stles.container}>
      <MapView
        ref={mapRef}
        style={stles.map}
        mapType={layer}
        onPress={clickOnMap}
        showsUserLocation
        onUserLocationChange={userMoves}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <ReturnButton />
      <ButtomMap
        userAction={centerUser}
        layerSelected={layer => changeLayer(layer)}
        trashAction={clearData}
      />
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
