import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
  });
};
