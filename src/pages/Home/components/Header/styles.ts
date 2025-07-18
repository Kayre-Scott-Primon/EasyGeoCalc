import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const stylesCollections = () => {
  const { top } = useSafeAreaInsets();
  return StyleSheet.create({
    container: {
      width: '100%',
      height: 60 + top,
      backgroundColor: '#fff',
      borderBottomEndRadius: 8,
      borderBottomStartRadius: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginTop: 10 + top,
    },
  });
};
