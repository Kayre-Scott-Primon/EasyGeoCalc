import { Text, TouchableOpacity, View } from 'react-native';
import { stylesCollections } from './styles';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function ReturnButton() {
  const styles = stylesCollections();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" type="feather" color="white" />
      </TouchableOpacity>
    </View>
  );
}
