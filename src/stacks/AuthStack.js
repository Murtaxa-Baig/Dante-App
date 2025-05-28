import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import OnBoardingScreen from '../screens/auth/OnBoardingScreen';
import SignUp from '../screens/auth/SignUp';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
