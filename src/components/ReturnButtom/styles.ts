import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 50,
      left: 0,
      width: 50,
      height: 50,
      backgroundColor: 'rgb(0,0,0,0.75)',
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: 'gray',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
  });
};
