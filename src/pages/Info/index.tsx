import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView from 'react-native-maps';
import ReturnButton from '../../components/ReturnButtom';
import ButtomMap from '../../components/ButtomMap';
import BottomSheet from '../../components/BottomSheet';

export default function Info() {
  const stles = stylesCollections();
  return (
    <View style={stles.container}>
      <MapView style={stles.map} mapType="satellite"></MapView>
      <ReturnButton />
      <ButtomMap />
      <BottomSheet title="Info" />
    </View>
  );
}
