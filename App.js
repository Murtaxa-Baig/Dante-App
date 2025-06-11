import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/stacks/AuthStack';
import AppStack from './src/stacks/AppStack';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {StatusBar, Platform} from 'react-native';
import {ThemeProvider} from './src/components/Theme';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from './src/utils/hooks/MmkvHook';
import {getApp} from '@react-native-firebase/app';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [userData, setUserData] = useMMKVStorage('userData', storage);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const firebaseApp = getApp();
    const auth = getAuth(firebaseApp);

    const subscriber = onAuthStateChanged(auth, user => {
      if (user) {
        setUserData(user?._user);
      } else {
        setUserData(null);
      }
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, [initializing, setUserData]);

  if (initializing) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <NavigationContainer onReady={() => SplashScreen.hide()}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#F37A52"
            translucent
          />
          {userData ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
