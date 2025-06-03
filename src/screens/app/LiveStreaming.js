import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import LinearWrapper from '../../components/ui/LinearWrapper';
import AppHeader from '../../components/ui/AppHeader';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import {theme} from '../../components/Theme';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import LinearGradient from 'react-native-linear-gradient';
import ToggleSwitch from 'toggle-switch-react-native';
import {mediaDevices, RTCView} from 'react-native-webrtc';
import {useIsFocused} from '@react-navigation/native';

const socialPlatforms = [
  {name: 'YouTube', icon: Xmls.youtubeIcon},
  {name: 'TikTok', icon: Xmls.tiktokIcon},
  {name: 'Facebook', icon: Xmls.instagramIcon},
  {name: 'Bigo', icon: Xmls.bigoIcon},
];

export default function LiveStreaming({navigation}) {
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [liveStreamStatus, setLiveStreamStatus] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [recordingIntervalId, setRecordingIntervalId] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [toggleStates, setToggleStates] = useState(
    socialPlatforms.map(() => false),
  );
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: {
            facingMode: 'user', // front camera
          },
        });
        setLocalStream(stream);
      } catch (error) {
        console.log('Error getting media stream:', error);
      }
    };

    if (isFocused) {
      startCamera();
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isFocused]);

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedHrs = hrs < 10 ? `0${hrs}` : hrs;
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
  }

  const socialIconLiveStream = [
    {icon: Xmls.youtubeIcon},
    {icon: Xmls.tiktokIcon},
    {icon: Xmls.bigoIcon},
    {icon: Xmls.facebookIcon},
    {icon: Xmls.addSocialItemIcon},
  ];

  const toggleHandler = index => {
    const newStates = [...toggleStates];
    newStates[index] = !newStates[index];
    setToggleStates(newStates);
  };

  const renderSocialLiveStreamItem = ({item, index}) => (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: verticalScale(4),
        }}>
        {item.icon !== Xmls.addSocialItemIcon ? (
          toggleStates[index] ? (
            <>
              <LinearGradient
                colors={['#F1EA24', '#4CBA47']}
                style={styles.statusDot}
              />
              <Text
                style={{
                  color: 'white',
                  marginLeft: horizontalScale(2),
                  fontFamily: theme.fontFamily.LabGrotesqueBold,
                }}>
                LIVE
              </Text>
            </>
          ) : (
            <Text
              style={{
                color: 'gray',
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
              }}>
              PAUSED
            </Text>
          )
        ) : (
          <View style={{height: 20}} />
        )}
      </View>

      <View style={styles.socialContainer}>
        <SvgXml xml={item.icon} width={30} height={30} />
      </View>

      {item.icon !== Xmls.addSocialItemIcon && (
        <View style={{marginTop: verticalScale(-12)}}>
          <ToggleSwitch
            isOn={toggleStates[index]}
            onColor="#4CBA47"
            offColor="#ccc"
            size="medium"
            onToggle={() => toggleHandler(index)}
          />
        </View>
      )}
    </View>
  );

  return (
    <LinearWrapper>
      <ScrollView>
        <AppHeader navigation={navigation} />
        <View
          style={[
            styles.liveStreamStatus,
            {
              height: liveStreamStatus ? verticalScale(241) : verticalScale(56),
              justifyContent: 'center',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
              }}>
              Livestream Status
            </Text>
            <TouchableOpacity
              onPress={() => setLiveStreamStatus(!liveStreamStatus)}>
              <SvgXml
                xml={
                  liveStreamStatus ? Xmls.dropUpIcon : Xmls.dropdownIconWhite
                }
                height={12}
                width={24}
              />
            </TouchableOpacity>
          </View>
          {liveStreamStatus && (
            <>
              <FlatList
                horizontal
                data={socialIconLiveStream}
                renderItem={renderSocialLiveStreamItem}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.flatListstatusContainer}
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={{
                  height: verticalScale(60),
                  marginTop: verticalScale(4),
                }}>
                <LinearGradient
                  colors={['#F1EA24', '#4CBA47']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(12),
                  }}>
                  <Text
                    style={{
                      color: theme.lightColor.textWhite,
                      fontSize: 18,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                    }}>
                    Live Settings
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.cameraContainer}>
          {localStream && (
            <RTCView
              streamURL={localStream.toURL()}
              style={StyleSheet.absoluteFill}
              objectFit="cover"
            />
          )}
          <View style={styles.overlayContent}>
            <View style={styles.statsBar}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.liveBadge}>
                  <LinearGradient
                    colors={['#F1EA24', '#4CBA47']}
                    style={styles.statusDot}
                  />
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
                <View style={styles.iconContainer}>
                  <SvgXml xml={Xmls.likeIcon} height={16} width={16} />
                  <Text style={styles.iconText}>90k</Text>
                </View>
                <View style={styles.iconContainer}>
                  <SvgXml xml={Xmls.viewIcon} height={16} width={16} />
                  <Text style={styles.iconText}>25k</Text>
                </View>
                <View style={styles.iconContainerNoBg}>
                  <SvgXml xml={Xmls.youtubeIcon} height={16} width={16} />
                  <Text style={styles.iconText}>15k</Text>
                </View>
                <View style={styles.iconContainerNoBg}>
                  <SvgXml xml={Xmls.facebookIcon} height={16} width={16} />
                  <Text style={styles.iconText}>10k</Text>
                </View>
              </ScrollView>
            </View>
            {isRecording && (
              <View
                style={{
                  position: 'absolute',
                  bottom: verticalScale(20),
                  alignSelf: 'center',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  paddingHorizontal: horizontalScale(12),
                  paddingVertical: verticalScale(6),
                  borderRadius: moderateScale(8),
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: theme.fontFamily.LabGrotesqueBold,
                  }}>
                  {formatTime(recordDuration)}
                </Text>
              </View>
            )}
          </View>
        </View>
        {isModalVisible && (
          <Modal isVisible={isModalVisible} transparent animationType="fade">
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text
                  style={{
                    color: theme.lightColor.textBlack,
                    fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    textAlign: 'center',
                    marginVertical: verticalScale(12),
                  }}>
                  Live Settings
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // handlePauseRecording();
                    setIsModalVisible(false);
                    // navigation.navigate('Summary');
                  }}
                  style={{
                    height: verticalScale(60),
                    marginTop: verticalScale(8),
                  }}>
                  <LinearGradient
                    colors={['#F1EA24', '#4CBA47']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: moderateScale(12),
                    }}>
                    <Text
                      style={{
                        color: theme.lightColor.textWhite,
                        fontSize: 18,
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                      }}>
                      Pause Live
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handlePauseRecording();
                    setIsModalVisible(false);
                    navigation.navigate('Summary');
                  }}
                  style={{
                    height: verticalScale(60),
                    marginTop: verticalScale(8),
                  }}>
                  <LinearGradient
                    colors={['#1A1464', '#AA176B', '#B3176B', '#EB5C20']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: moderateScale(12),
                    }}>
                    <Text
                      style={{
                        color: theme.lightColor.textWhite,
                        fontSize: 18,
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                      }}>
                      End all livestream
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <LinearGradient
                  colors={['#EB5C20', '#B3176B', '#AA176B', '#1A1464']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    width: '100%',
                    borderRadius: moderateScale(12),
                    padding: 3,
                    marginTop: verticalScale(8),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(false);
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
                        Close
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </LinearWrapper>
  );
}

const COMMENT_CIRCLE_SIZE = horizontalScale(34);
const SOCIAL_CIRCLE_SIZE = horizontalScale(58);

const styles = StyleSheet.create({
  liveStreamStatus: {
    height: verticalScale(56),
    marginHorizontal: horizontalScale(20),
    backgroundColor: theme.lightColor.bgLightBlack,
    borderRadius: moderateScale(24),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  socialContainer: {
    height: SOCIAL_CIRCLE_SIZE,
    width: SOCIAL_CIRCLE_SIZE,
    borderRadius: SOCIAL_CIRCLE_SIZE / 2,
    backgroundColor: theme.lightColor.bgWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(3),
  },
  statusDot: {
    height: verticalScale(10),
    width: horizontalScale(10),
    borderRadius: moderateScale(10),
  },
  flatListstatusContainer: {
    marginTop: verticalScale(8),
  },
  cameraContainer: {
    // flex: 1,
    height: verticalScale(650),
    marginHorizontal: horizontalScale(20),
    borderRadius: moderateScale(24),
    overflow: 'hidden',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(20),
    // backgroundColor: theme.lightColor.bgWhite,
    // backgroundColor: 'green',
    // position: 'relative',
  },
  overlayContent: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(34),
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: horizontalScale(10),
  },
  liveText: {
    color: 'white',
    marginLeft: horizontalScale(4),
    fontFamily: theme.fontFamily.LabGrotesqueBold,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(34),
    width: horizontalScale(73),
    backgroundColor: '#333333',
    borderRadius: moderateScale(10),
    marginRight: 10,
  },
  iconContainerNoBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(34),
    width: horizontalScale(50),
    marginRight: 10,
  },
  iconText: {
    color: theme.lightColor.textWhite,
    marginLeft: horizontalScale(4),
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
    height: verticalScale(280),
    width: '100%',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
  },
});
