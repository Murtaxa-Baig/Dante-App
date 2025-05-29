import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './BottomTab';
import GoLive from '../screens/app/GoLive';
import History from '../screens/app/History';
import Home from '../screens/app/Home';
import Notifications from '../screens/app/Notifications';
import Profile from '../screens/app/Profile';
import SettingScreen from '../screens/app/SettingScreen';
import SubscriptionScreen from '../screens/app/SubscriptionScreen';
import EditProfile from '../screens/app/EditProfile';
import LiveStreaming from '../screens/app/LiveStreaming';
import Summary from '../screens/app/Summary';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        headerShown: false,
      }}
      initialRouteName="All">
      <Stack.Screen name="All" component={BottomTab} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GoLive" component={GoLive} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="LiveStreaming" component={LiveStreaming} />
      <Stack.Screen name="Summary" component={Summary} />
    </Stack.Navigator>
  );
}
