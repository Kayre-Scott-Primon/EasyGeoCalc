import { Text, View } from 'react-native';
import { stylesCollections } from './styles';

export default function Header() {
  const styles = stylesCollections();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Easy Geographic Calculator</Text>
    </View>
  );
}
