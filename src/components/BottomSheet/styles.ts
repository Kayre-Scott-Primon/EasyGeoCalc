import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      minWidth: '50%',
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: 'gray',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
    },
    description: {
      color: 'gray',
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 10,
      marginBottom: 10,
    },
  });
};
