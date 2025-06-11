import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
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
import {TextInput} from 'react-native-gesture-handler';

const socialPlatforms = [
  {name: 'YouTube', icon: Xmls.youtubeIcon},
  {name: 'TikTok', icon: Xmls.tiktokIcon},
  {name: 'Instagram', icon: Xmls.instagramIcon},
  {name: 'Bigo', icon: Xmls.bigoIcon},
];

export default function Home({navigation}) {
  const [userData, setUserData] = useMMKVStorage('userData', storage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [isModalFor, setIsModalFor] = useState(null);
  const [toggleStates, setToggleStates] = useState(
    socialPlatforms.map(() => false),
  );
  // console.log('userData?.displayName========', userData?.displayName);

  const toggleHandler = index => {
    const newStates = [...toggleStates];
    const isTurningOn = !toggleStates[index];

    newStates[index] = isTurningOn;
    setToggleStates(newStates);

    if (isTurningOn) {
      setIsModalFor(socialPlatforms[index].name);
      setIsModalVisible(true);
    }
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

      {isModalVisible && (
        <Modal isVisible={isModalVisible} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <SvgXml
                  xml={Xmls.closeIcon}
                  width={16}
                  height={16}
                  style={{
                    marginRight: horizontalScale(4),
                    marginTop: verticalScale(4),
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: theme.fontFamily.LabGrotesqueRegular,
                  fontSize: 18,
                  textAlign: 'center',
                  color: theme.lightColor.textBlack,
                  marginVertical: verticalScale(8),
                }}>
                Add{' '}
                <Text
                  style={{
                    color: '#D82D7E',
                    fontFamily: theme.fontFamily.LabGrotesqueBold,
                  }}>
                  {isModalFor}
                </Text>{' '}
                Stream URL and key
              </Text>

              <Text
                style={{
                  marginBottom: verticalScale(4),
                  fontFamily: theme.fontFamily.LabGrotesqueRegular,
                }}>
                Stream URL
              </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Stream URL"
                placeholderTextColor="#0000004A"
              />

              <Text
                style={{
                  marginTop: verticalScale(8),
                  marginBottom: verticalScale(4),
                  fontFamily: theme.fontFamily.LabGrotesqueRegular,
                }}>
                Stream key
              </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Stream key"
                placeholderTextColor="#0000004A"
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.submitButtonWrapper}>
                <LinearGradient
                  colors={['#F1EA24', '#4CBA47']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.submitButton}>
                  <Text style={styles.addButtonText}>Submit</Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 12,
                  color: theme.lightColor.textBlack,
                  fontFamily: theme.fontFamily.LabGrotesqueRegular,
                  marginTop: verticalScale(16),
                  textAlign: 'center',
                  color: 'red',
                }}>
                If you're not sure where to find the stream URL and key, click
                'Info'.It will guide you through the process.
              </Text>

              <LinearGradient
                colors={['#EB5C20', '#B3176B', '#AA176B', '#1A1464']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  width: '100%',
                  borderRadius: moderateScale(12),
                  padding: 3,
                  marginTop: verticalScale(16),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    setIsInfoModal(true);
                  }}
                  activeOpacity={0.8}
                  style={{
                    height: verticalScale(60),
                    width: '100%',
                    borderRadius: moderateScale(9),
                  }}>
                  <LinearGradient
                    colors={['#ffffff', '#ffffff']}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: moderateScale(9),
                    }}>
                    <Text
                      style={{
                        color: '#D82D7E',
                        fontSize: 18,
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                      }}>
                      Info
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </Modal>
      )}

      {/* info modal  */}
      {isInfoModal && (
        <Modal isVisible={isInfoModal} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.infoModalContent}>
              <TouchableOpacity
                onPress={() => setIsInfoModal(false)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <SvgXml xml={Xmls.closeIcon} width={16} height={16} />
              </TouchableOpacity>
              <ScrollView>
                <Text
                  style={{
                    fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    color: theme.lightColor.textBlack,
                    fontSize: 14,
                  }}>
                  Instagram mobile doesn’t support external streaming tools
                  directly. You can’t get Instagram’s RTMP URL & Stream Key from
                  the mobile app as it’s not exposed there. To get them, We have
                  two options: Manual Method: Go to Instagram Live Producer on a
                  desktop browser. Start a new live setup — it will show the
                  RTMP URL + Stream Key. WebView Workaround: Open Instagram Live
                  Producer in a WebView in your app (with desktop UA spoofing),
                  guide users to copy/paste the key (Not 100% safe by instagram
                  security concerns).
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    height: verticalScale(470),
    width: '100%',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
  },

  inputStyle: {
    height: verticalScale(60),
    backgroundColor: theme.lightColor.bgWhite,
    paddingHorizontal: horizontalScale(20),
    borderWidth: 1,
    borderColor: theme.lightColor.textGray,
    borderRadius: moderateScale(12),
    color: theme.lightColor.textBlack,
    fontSize: moderateScale(16),
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },
  submitButtonWrapper: {
    height: verticalScale(60),
    borderRadius: moderateScale(9),
    marginTop: verticalScale(16),
  },
  submitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(12),
  },
  infoModalContent: {
    backgroundColor: 'white',
    height: verticalScale(350),
    width: '100%',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    borderRadius: moderateScale(12),
  },
});
