import { Text, TouchableOpacity, View } from 'react-native';
import { stylesCollections } from './styles';
import { Icon } from '@rneui/themed';

export default function ButtomMap() {
  const styles = stylesCollections();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="edit" type="feather" color="#008200" style={styles.icons} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="trash"
          type="feather"
          color="#008200"
          style={styles.icons}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="plus-circle"
          type="feather"
          color="#008200"
          style={styles.icons}
        />
      </TouchableOpacity>
    </View>
  );
}
