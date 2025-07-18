import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView, { Marker, Polyline } from 'react-native-maps';
import BottomSheet from '../../components/BottomSheet';
import ButtomMap from '../../components/ButtomMap';
import ReturnButton from '../../components/ReturnButtom';
import { useEffect, useRef, useState } from 'react';
import { isPolygon } from '../../utils/geoVerificarions/polygon';
import { calculateArea } from '../../utils/turf/area';
import { convertAreaIfNeeded } from '../../utils/scales/convertionsArea';
import type { MapType } from 'react-native-maps';

export default function Area() {
  const mapRef = useRef<MapView>(null);

  const stles = stylesCollections();

  const [pointsOfArea, setPointsOfArea] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [area, setArea] = useState<string>('');
  const [layer, setLayer] = useState<MapType>('satellite');
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  function clickOnMap(event: any) {
    const { coordinate } = event.nativeEvent;
    if (isPolygon(pointsOfArea)) {
      setPointsOfArea([coordinate]);
    } else {
      setPointsOfArea([...pointsOfArea, coordinate]);
    }
  }

  function clearData() {
    setPointsOfArea([]);
    setArea('');
  }

  function centerUser() {
    console.log('Centering user location', userLocation);
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  }

  function userMoves(event: any) {
    const { coordinate } = event.nativeEvent;
    setUserLocation(coordinate);
  }

  function changeLayer(layer: MapType) {
    setLayer(layer);
  }

  useEffect(() => {
    if (isPolygon(pointsOfArea)) {
      const area = calculateArea(pointsOfArea);
      const { value, unit } = convertAreaIfNeeded(area);
      setArea(`${value.toFixed(2)} ${unit}`);
    }
  }, [pointsOfArea]);

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
        {pointsOfArea.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}
        {pointsOfArea.length > 1 && (
          <Polyline
            coordinates={pointsOfArea}
            strokeColor="#000"
            strokeWidth={2}
          />
        )}
      </MapView>
      <ButtomMap
        userAction={centerUser}
        layerSelected={layer => changeLayer(layer)}
        trashAction={clearData}
      />
      <BottomSheet title="Área" value={area} />
      <ReturnButton />
    </View>
  );
}
