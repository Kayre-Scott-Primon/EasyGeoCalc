import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView from 'react-native-maps';
import BottomSheet from './components/BottomSheet';
import ButtomMap from './components/ButtomMap';
import ReturnButton from '../../components/ReturnButtom';

export default function Area() {
  const stles = stylesCollections();
  return (
    <View style={stles.container}>
      <MapView style={stles.map} mapType="satellite"></MapView>
      <ButtomMap />
      <BottomSheet />
      <ReturnButton />
    </View>
  );
}
