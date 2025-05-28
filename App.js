import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/stacks/AuthStack';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import AppStack from './src/stacks/AppStack';
import {ThemeProvider} from './src/components/Theme';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from './src/utils/hooks/MmkvHook';

export default function App() {
  const [userData, setUserData] = useMMKVStorage('userData', storage);

  console.log('userdata is here', userData);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <NavigationContainer>
          {/* <SafeAreaView
            style={{
              flex: 1,
              paddingTop:
                Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}> */}
          <StatusBar
            barStyle="light-content"
            backgroundColor="#F37A52"
            translucent
          />
          {/* <LinearWrapper> */}
          {/* <AuthStack /> */}
          {/* <AppStack /> */}
          {userData ? <AppStack /> : <AuthStack />}
          {/* </LinearWrapper> */}
          {/* </SafeAreaView> */}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
