import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {horizontalScale, moderateScale} from '../../utils/Matrix';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../Theme';

export default function AppHeader({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <LinearGradient
            colors={['#F1EA24', '#4CBA47']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorder}>
            <View style={styles.innerCircle}>
              <SvgXml
                xml={Xmls.profileIcon}
                width={CIRCLE_SIZE / 2}
                height={CIRCLE_SIZE / 2}
              />
            </View>
          </LinearGradient>
          <Text style={styles.username}>@johnsmith</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <SvgXml xml={Xmls.settingIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CIRCLE_SIZE = horizontalScale(48);

const styles = StyleSheet.create({
  container: {
    marginTop: horizontalScale(42),
    marginHorizontal: horizontalScale(20),
    marginBottom: horizontalScale(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    color: theme.lightColor.textWhite,
    marginLeft: horizontalScale(12),
  },
  gradientBorder: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    backgroundColor: theme.lightColor.bgWhite,
    width: CIRCLE_SIZE - moderateScale(4),
    height: CIRCLE_SIZE - moderateScale(4),
    borderRadius: (CIRCLE_SIZE - moderateScale(4)) / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
