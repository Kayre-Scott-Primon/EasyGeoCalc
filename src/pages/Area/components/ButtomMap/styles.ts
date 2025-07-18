import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 50,
      right: 0,
      width: 60,
      backgroundColor: 'rgb(0,0,0,0.75)',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderColor: 'gray',
      alignItems: 'center',
      alignContent: 'space-between',
      paddingVertical: 15,
    },
    icons: {
      marginVertical: 10,
    },
  });
};
