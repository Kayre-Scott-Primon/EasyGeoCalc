import { PermissionsAndroid, Platform } from 'react-native';

export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    return true; // iOS lida via Info.plist e popup automático
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Localização',
        message: 'Este app precisa acessar sua localização.',
        buttonPositive: 'Ok',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}
