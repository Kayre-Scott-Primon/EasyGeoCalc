import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#008200',
      justifyContent: 'center',
    },
    list: {
      marginTop: 20,
      marginHorizontal: 20,
    },
    divider: {
      height: 10,
    },
  });
};
