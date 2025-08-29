import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    containerForms: {
        position: 'absolute',
        bottom: 300,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1, 
        justifyContent: 'space-between'
    }
  });
};
