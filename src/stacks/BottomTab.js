import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgFromXml} from 'react-native-svg';

import Home from '../screens/app/Home';
import History from '../screens/app/History';
import GoLive from '../screens/app/GoLive';
import Notifications from '../screens/app/Notifications';
import Profile from '../screens/app/Profile';

import Xmls from '../utils/Xmls';
import {theme} from '../components/Theme';
import {horizontalScale, verticalScale} from '../utils/Matrix';

const Tab = createBottomTabNavigator();

// Custom middle button for GoLive tab
const CreateButton = ({children, focused, onPress}) => (
  <Pressable
    style={styles.createButtonContainer}
    onPress={onPress}
    activeOpacity={0.7}>
    <SvgFromXml xml={Xmls.streamIcon} />
  </Pressable>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#56ab2f',
        tabBarInactiveTintColor: '#888',
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconWrapper}>
              <SvgFromXml xml={focused ? Xmls.homeActive : Xmls.homeInActive} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconWrapper}>
              <SvgFromXml
                xml={focused ? Xmls.historyActive : Xmls.historyInActive}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="GoLive"
        component={GoLive}
        options={{
          tabBarButton: props => <CreateButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconWrapper}>
              <SvgFromXml
                xml={
                  focused ? Xmls.notificationActive : Xmls.notificationInActive
                }
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconWrapper}>
              <SvgFromXml
                xml={focused ? Xmls.profileActive : Xmls.profileInActive}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#000000',
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: verticalScale(66),
    paddingHorizontal: horizontalScale(10),
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    alignItems: 'center',
  },
  createButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -verticalScale(5),
  },
  iconWrapper: {
    marginTop: verticalScale(25),
  },
});
