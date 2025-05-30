import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export default function SocialLoginHook() {
  const loginWithFacebook = async () => {
    try {
      // Facebook login permissions request
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      // Get Facebook access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      console.log('Facebook Access Token: ', data.accessToken);

      // Create Firebase credential from access token
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log('Firebase Credential: ', facebookCredential);

      // Get Firebase Auth instance
      const auth = await signInWithCredential(getAuth(), facebookCredential);
      console.log('Firebase Auth Result: ', auth);

      return auth;
    } catch (error) {
      console.error('Facebook Login Error:', error);
      throw error;
    }
  };

  return {loginWithFacebook};
}
