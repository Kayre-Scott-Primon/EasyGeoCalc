import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView, { Marker, Polyline } from 'react-native-maps';
import BottomSheet from '../../components/BottomSheet';
import ButtomMap from '../../components/ButtomMap';
import ReturnButton from '../../components/ReturnButtom';
import { useEffect, useState } from 'react';
import { isPolygon } from '../../utils/geoVerificarions/polygon';
import { calculateArea } from '../../utils/turf/area';
import { convertAreaIfNeeded } from '../../utils/scales/convertionsArea';

export default function Area() {
  const stles = stylesCollections();

  const [pointsOfArea, setPointsOfArea] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [area, setArea] = useState<string>('');

  function clickOnMap(event: any) {
    const { coordinate } = event.nativeEvent;
    if (isPolygon(pointsOfArea)) {
      setPointsOfArea([coordinate]);
    } else {
      setPointsOfArea([...pointsOfArea, coordinate]);
    }
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
      <MapView style={stles.map} mapType="satellite" onPress={clickOnMap}>
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
      <ButtomMap />
      <BottomSheet title="Área" value={area} />
      <ReturnButton />
    </View>
  );
}
