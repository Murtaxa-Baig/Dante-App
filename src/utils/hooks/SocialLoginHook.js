import {useRef} from 'react';
import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {InstagramLogin} from 'react-native-instagram-login';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from './MmkvHook';

export default function SocialLoginHook() {
  const [userData, setUserData] = useMMKVStorage('userData', storage, false);

  const instagramLoginRef = useRef(null);

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
      // console.log('Facebook Access Token: ', data.accessToken);

      // Create Firebase credential from access token
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken,
      );
      // console.log('Firebase Credential: ', facebookCredential);

      // Get Firebase Auth instance
      const auth = await signInWithCredential(getAuth(), facebookCredential);
      // console.log('Firebase Auth Result: ', auth);

      return auth;
    } catch (error) {
      console.error('Facebook Login Error:', error);
      throw error;
    }
  };

  const loginWithInstagram = () => {
    instagramLoginRef.current?.show();
  };

  const handleInstagramSuccess = async token => {
    console.log('Token log is here', token);

    try {
      const response = await fetch(
        `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${token}`,
      );
      const data = await response.json();
      console.log('Instagram user data:', data);
      // setUserData(data);
    } catch (error) {
      console.error('Instagram Login Error:', error);
    }
  };

  return {
    loginWithFacebook,
    loginWithInstagram,
    handleInstagramSuccess,
    instagramLoginRef,
  };
}
