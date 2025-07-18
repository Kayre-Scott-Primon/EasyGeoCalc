import { Text, View } from 'react-native';
import { stylesCollections } from './styles';

export default function BottomSheet() {
  const styles = stylesCollections();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Area: 0 m²</Text>
    </View>
  );
}
