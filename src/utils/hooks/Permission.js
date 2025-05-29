import {PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';
import {PermissionsAndroid, Platform} from 'react-native';

export default function Permission() {
  // Request camera and microphone permissions
  const requestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ];

        const results = await PermissionsAndroid.requestMultiple(permissions);

        const allGranted = permissions.every(
          permission =>
            results[permission] === PermissionsAndroid.RESULTS.GRANTED,
        );

        return allGranted;
      }

      if (Platform.OS === 'ios') {
        const permissions = [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.MICROPHONE,
        ];

        const results = await requestMultiple(permissions);

        const allGranted = permissions.every(
          permission => results[permission] === RESULTS.GRANTED,
        );

        return allGranted;
      }

      return false;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  };
  return {
    requestPermission,
  };
}
