import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView, { Marker, Polyline } from 'react-native-maps';
import ReturnButton from '../../components/ReturnButtom';
import ButtomMap from '../../components/ButtomMap';
import BottomSheet from '../../components/BottomSheet';
import { useEffect, useState } from 'react';
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
      <MapView style={stles.map} mapType="satellite" onPress={clickOnMap}>
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
      <ButtomMap />
      <BottomSheet title="Distancia" value={distance} />
    </View>
  );
}
