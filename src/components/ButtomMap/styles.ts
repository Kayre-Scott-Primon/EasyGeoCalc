import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 50,
      right: 0,
      backgroundColor: 'rgb(0,0,0,0.75)',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderColor: 'gray',
      justifyContent: 'flex-start',
      alignContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
    icons: {
      marginVertical: 10,
    },
    buttonIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listLayers: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionsOfList: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 5,
    },
    buttonOptionsOfList: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderColor: 'gray',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
