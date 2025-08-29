import { FlatList, View } from 'react-native';
import ItemList from './components/ItemList';
import Header from './components/Header';
import { stylesCollections } from './styles';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { requestLocationPermission } from '../../utils/permissions/location';
type RootStackParamList = {
  Area: undefined;
  Distance: undefined;
  Info: undefined;
};

export default function Home() {
  const list = [
    { id: '1', title: 'Calculo de area', page: 'Area' },
    { id: '2', title: 'Calculo de distancia', page: 'Distance' },
    { id: '3', title: 'Informacoes de um ponto', page: 'Info' },
    { id: '4', title: 'Formas', page: 'Forms' },
  ];

  const styles = stylesCollections();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={list}
        style={styles.list}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={({ item }) => (
          <ItemList
            title={item.title}
            onPress={() => navigation.navigate(item.page)}
          />
        )}
      />
    </View>
  );
}
