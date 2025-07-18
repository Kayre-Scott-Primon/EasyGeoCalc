import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView, { MapType, Marker, Polyline } from 'react-native-maps';
import ReturnButton from '../../components/ReturnButtom';
import ButtomMap from '../../components/ButtomMap';
import BottomSheet from '../../components/BottomSheet';
import { useEffect, useRef, useState } from 'react';
import { distanceBetweenPoints } from '../../utils/turf/distance';
import { convertKilometerOrMeters } from '../../utils/scales/convertionsLinear';

type pointsToDistanceType = {
  pointA: { latitude: number; longitude: number } | null;
  pointB: { latitude: number; longitude: number } | null;
};

export default function Distance() {
  const stles = stylesCollections();

  const [pointsToDistance, setPointsToDistance] =
    useState<pointsToDistanceType>({
      pointA: null,
      pointB: null,
    });
  const [distance, setDistance] = useState<string>('');
  const [layer, setLayer] = useState<MapType>('satellite');
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const mapRef = useRef<MapView>(null);

  function clickOnMap(event: any) {
    const { coordinate } = event.nativeEvent;
    if (!pointsToDistance.pointA) {
      setPointsToDistance({
        ...pointsToDistance,
        pointA: coordinate,
      });
    } else if (!pointsToDistance.pointB) {
      setPointsToDistance({
        ...pointsToDistance,
        pointB: coordinate,
      });
    } else {
      setPointsToDistance({
        pointA: coordinate,
        pointB: null,
      });
    }
  }

  function clearData() {
    setPointsToDistance({ pointA: null, pointB: null });
    setDistance('');
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

  useEffect(() => {
    if (pointsToDistance.pointA && pointsToDistance.pointB) {
      const distance = distanceBetweenPoints({
        pointA: pointsToDistance.pointA,
        pointB: pointsToDistance.pointB,
      });
      const { value: convertedDistance, unit } = convertKilometerOrMeters({
        value: distance,
      });
      setDistance(convertedDistance.toFixed(2) + ' ' + unit);
    }
  }, [pointsToDistance]);

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
        {pointsToDistance.pointA && (
          <Marker
            coordinate={pointsToDistance.pointA}
            title="Ponto A"
            description="Clique para definir o ponto B"
          />
        )}
        {pointsToDistance.pointB && (
          <Marker
            coordinate={pointsToDistance.pointB}
            title="Ponto B"
            description="Clique para definir o ponto A"
          />
        )}
        {distance && pointsToDistance.pointA && pointsToDistance.pointB && (
          <Polyline
            key={`geometry-line-dashed`}
            coordinates={[pointsToDistance.pointA, pointsToDistance.pointB]}
            strokeWidth={5}
            lineDashPattern={[30, 25]}
            lineCap="square"
            strokeColor={'white'}
          />
        )}
      </MapView>
      <ReturnButton />
      <ButtomMap
        userAction={centerUser}
        layerSelected={layer => changeLayer(layer)}
        trashAction={clearData}
      />
      <BottomSheet title="Distancia" value={distance} />
    </View>
  );
}
