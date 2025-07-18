import { View } from 'react-native';
import { stylesCollections } from './styles';
import MapView from 'react-native-maps';

export default function Distance() {
  const stles = stylesCollections();
  return (
    <View style={stles.container}>
      <MapView style={stles.map}></MapView>
    </View>
  );
}
