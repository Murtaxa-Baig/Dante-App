import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ToggleSwitch from 'toggle-switch-react-native';

import LinearWrapper from '../../components/ui/LinearWrapper';
// import AppHeader from '../../components/ui/AppHeader';
import {SvgXml} from 'react-native-svg';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import {theme} from '../../components/Theme';
import Xmls from '../../utils/Xmls';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from '../../utils/hooks/MmkvHook';

const socialPlatforms = [
  {name: 'YouTube', icon: Xmls.youtubeIcon},
  {name: 'TikTok', icon: Xmls.tiktokIcon},
  {name: 'Facebook', icon: Xmls.instagramIcon},
  {name: 'Bigo', icon: Xmls.bigoIcon},
];

export default function Home({navigation}) {
  const [userData, setUserData] = useMMKVStorage('userData', storage);
  const [toggleStates, setToggleStates] = useState(
    socialPlatforms.map(() => false),
  );
  // console.log('userData?.displayName========', userData?.displayName);

  const toggleHandler = index => {
    const newStates = [...toggleStates];
    newStates[index] = !newStates[index];
    setToggleStates(newStates);
  };

  return (
    <LinearWrapper>
      {/* <AppHeader navigation={navigation} /> */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <LinearGradient
            colors={['#F1EA24', '#4CBA47']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorder}>
            <View style={styles.innerCircleee}>
              <SvgXml
                xml={Xmls.profileIcon}
                width={CIRCLE_SIZE / 2}
                height={CIRCLE_SIZE / 2}
              />
            </View>
          </LinearGradient>
          <Text style={styles.title}>{userData?.displayName}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <SvgXml xml={Xmls.settingIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.liveStreamContainer}>
          <Text style={styles.statusText}>Livestream Status</Text>

          {socialPlatforms.map((platform, index) => (
            <View key={platform.name} style={styles.cardContent}>
              <View style={styles.leftSection}>
                <View
                  style={[
                    styles.socialIconBorder,
                    {
                      backgroundColor: toggleStates[index]
                        ? '#D82D7E'
                        : 'transparent',
                    },
                  ]}>
                  <View style={styles.innerCircle}>
                    <SvgXml
                      xml={platform.icon}
                      height={verticalScale(21)}
                      width={horizontalScale(30)}
                    />
                  </View>
                </View>

                {toggleStates[index] ? (
                  <>
                    <LinearGradient
                      colors={['#F1EA24', '#4CBA47']}
                      style={styles.statusDot}
                    />
                    <Text
                      style={[
                        styles.statusLabel,
                        {
                          fontFamily: theme.fontFamily.LabGrotesqueBold,
                          color: theme.lightColor.textWhite,
                        },
                      ]}>
                      LIVE
                    </Text>
                  </>
                ) : (
                  <Text
                    style={[
                      styles.statusLabel,
                      {
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        color: theme.lightColor.textGray,
                      },
                    ]}>
                    Paused
                  </Text>
                )}
              </View>

              <ToggleSwitch
                isOn={toggleStates[index]}
                onColor="#4CBA47"
                offColor="#E4E4E4"
                size="medium"
                onToggle={() => toggleHandler(index)}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.addButtonWrapper}>
          <LinearGradient
            colors={['#F1EA24', '#4CBA47']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Livestream</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearWrapper>
  );
}

const CIRCLE_SIZE = horizontalScale(48);
const SOCIAL_CIRCLE_SIZE = horizontalScale(48);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(20),
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
  statusText: {
    textAlign: 'center',
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
    color: theme.lightColor.textWhite,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(4),
  },
  liveStreamContainer: {
    marginTop: verticalScale(12),
    height: verticalScale(376),
    backgroundColor: theme.lightColor.textBlack,
    borderRadius: moderateScale(24),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(11),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIconBorder: {
    width: SOCIAL_CIRCLE_SIZE,
    height: SOCIAL_CIRCLE_SIZE,
    borderRadius: SOCIAL_CIRCLE_SIZE / 2,
    padding: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(6),
  },
  statusDot: {
    height: verticalScale(10),
    width: horizontalScale(10),
    marginLeft: horizontalScale(4),
    borderRadius: 5,
  },
  statusLabel: {
    marginLeft: verticalScale(4),
  },
  addButtonWrapper: {
    height: verticalScale(60),
    borderRadius: moderateScale(9),
    marginTop: verticalScale(16),
  },
  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(9),
  },
  addButtonText: {
    color: theme.lightColor.textWhite,
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(42),
    marginHorizontal: horizontalScale(20),
  },

  gradientBorder: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    padding: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircleee: {
    backgroundColor: theme.lightColor.bgWhite,
    width: CIRCLE_SIZE - moderateScale(4),
    height: CIRCLE_SIZE - moderateScale(4),
    borderRadius: (CIRCLE_SIZE - moderateScale(4)) / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.lightColor.textWhite,
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    marginLeft: horizontalScale(12),
  },
});
