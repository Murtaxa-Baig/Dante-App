import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import LinearWrapper from '../../components/ui/LinearWrapper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../components/Theme';
import Xmls from '../../utils/Xmls';
import {SvgXml} from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import MaskedView from '@react-native-masked-view/masked-view';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from '../../utils/hooks/MmkvHook';

export default function Profile({navigation}) {
  const [userData, setUserData] = useMMKVStorage('userData', storage);

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [resolutionValue, setResolutionValue] = useState(null);
  const [resolutionItems, setResolutionItems] = useState([
    {label: '480p', value: '480p'},
    {label: '720p', value: '720p'},
    {label: '1080p', value: '1080p'},
  ]);

  const [frameRateOpen, setFrameRateOpen] = useState(false);
  const [frameRateValue, setFrameRateValue] = useState(null);
  const [frameRateItems, setFrameRateItems] = useState([
    {label: '30fps', value: '30fps'},
    {label: '60fps', value: '60fps'},
  ]);

  const [audioQualityOpen, setAudioQualityOpen] = useState(false);
  const [audioQualityValue, setAudioQualityValue] = useState(null);
  const [audioQualityItems, setAudioQualityItems] = useState([
    // {label: 'Low', value: 'low'},
    {label: 'Medium', value: 'medium'},
    {label: 'High', value: 'high'},
  ]);
  const platforms = [
    {title: 'Youtube', icon: Xmls.youtubeIcon, status: 'connected'},
    {title: 'Tiktok', icon: Xmls.tiktokIcon, status: 'connect'},
    {title: 'BIGO', icon: Xmls.bigoIcon, status: 'connected'},
    {title: 'Instagram', icon: Xmls.instagramIcon, status: 'connect'},
    {title: 'Facebook', icon: Xmls.facebookIcon, status: 'connected'},
    {title: 'Twitch', icon: Xmls.twitchIcon, status: 'connect'},
  ];
  return (
    <LinearWrapper>
      <View
        style={[
          styles.container,
          {
            paddingTop: horizontalScale(66),
          },
        ]}>
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
        <Text
          style={{
            color: theme.lightColor.textWhite,
            fontFamily: theme.fontFamily.LabGrotesqueBold,
            marginVertical: verticalScale(6),
            fontSize: 18,
          }}>
          John Smith
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: theme.lightColor.textWhite,
              fontFamily: theme.fontFamily.LabGrotesqueRegular,
            }}>
            @johnsmith
          </Text>
          <View
            style={{
              width: horizontalScale(2),
              height: horizontalScale(16),
              backgroundColor: theme.lightColor.textGray,
              marginHorizontal: horizontalScale(4),
            }}></View>
          <Text
            style={{
              color: theme.lightColor.textWhite,
              fontFamily: theme.fontFamily.LabGrotesqueRegular,
            }}>
            14k followers
          </Text>
        </View>
        {!isEditProfile && (
          <TouchableOpacity
            // onPress={() => setIsEditProfile(true)}
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              height: verticalScale(46),
              width: horizontalScale(164),
              marginVertical: verticalScale(12),
            }}>
            <LinearGradient
              colors={['#F1EA24', '#4CBA47']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: moderateScale(24),
              }}>
              <Text
                style={{
                  color: theme.lightColor.textWhite,
                  fontSize: 18,
                  fontFamily: theme.fontFamily.LabGrotesqueBold,
                }}>
                Edit profile
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: verticalScale(64)}}>
        <View style={styles.container}>
          {isEditProfile ? (
            <>
              <View style={styles.editProfileContainer}>
                <Text
                  style={{
                    color: theme.lightColor.textBlack,
                    fontFamily: theme.fontFamily.LabGrotesqueBold,
                    marginBottom: verticalScale(12),
                  }}>
                  Edit Profile
                </Text>
                <View
                  style={[
                    styles.subscriptionMethod,
                    {
                      marginBottom: verticalScale(12),
                    },
                  ]}>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      fontSize: 12,
                    }}>
                    Name
                  </Text>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                      fontSize: 12,
                    }}>
                    John Smith
                  </Text>
                </View>
                <View
                  style={[
                    styles.subscriptionMethod,
                    {
                      marginBottom: verticalScale(12),
                    },
                  ]}>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      fontSize: 12,
                    }}>
                    Email
                  </Text>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                      fontSize: 12,
                    }}>
                    johnsmith@mail.com
                  </Text>
                </View>
                <View style={styles.subscriptionMethod}>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      fontSize: 12,
                    }}>
                    Password
                  </Text>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                      fontSize: 12,
                    }}>
                    ************
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditProfile(false)}
                style={{
                  height: verticalScale(60),
                  width: '100%',
                  marginTop: verticalScale(12),
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
                    Save Changes
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* <TouchableOpacity
                onPress={() => setIsEditProfile(true)}
                style={{
                  height: verticalScale(46),
                  width: horizontalScale(164),
                  marginVertical: verticalScale(12),
                }}>
                <LinearGradient
                  colors={['#F1EA24', '#4CBA47']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(24),
                  }}>
                  <Text
                    style={{
                      color: theme.lightColor.textWhite,
                      fontSize: 18,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                    }}>
                    Edit profile
                  </Text>
                </LinearGradient>
              </TouchableOpacity> */}
              <View style={styles.platformsContainer}>
                <Text
                  style={{
                    color: theme.lightColor.textBlack,
                    fontFamily: theme.fontFamily.LabGrotesqueBold,
                    marginBottom: verticalScale(12),
                  }}>
                  Connected platforms
                </Text>
                {platforms.map((platform, index) => {
                  return (
                    <View style={styles.platformsSection} key={index}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SvgXml xml={platform.icon} height={30} width={30} />
                        <Text
                          style={{
                            color: theme.lightColor.textBlack,
                            fontFamily: theme.fontFamily.LabGrotesqueBold,
                            marginLeft: horizontalScale(4),
                          }}>
                          {platform.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#4CBA471A',
                          paddingHorizontal: horizontalScale(4),
                          paddingVertical: verticalScale(3),
                          borderRadius: moderateScale(5),
                        }}>
                        <Text
                          style={{
                            color: theme.lightColor.textGreen,
                            fontFamily: theme.fontFamily.LabGrotesqueRegular,
                          }}>
                          Connected
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={styles.livestreamSettingsContainer}>
                <Text
                  style={{
                    color: theme.lightColor.textBlack,
                    fontFamily: theme.fontFamily.LabGrotesqueBold,
                    marginBottom: verticalScale(12),
                  }}>
                  Livestream Settings
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: verticalScale(2),
                  }}>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    }}>
                    Resolution
                  </Text>
                  <View style={{marginBottom: 12}}>
                    <DropDownPicker
                      open={resolutionOpen}
                      value={resolutionValue}
                      items={resolutionItems}
                      setOpen={setResolutionOpen}
                      setValue={setResolutionValue}
                      setItems={setResolutionItems}
                      itemSeparatorStyle={styles.itemSeparatorStyle}
                      itemSeparator={true}
                      listMode="SCROLLVIEW"
                      placeholder="360p"
                      style={styles.dropdownStyle}
                      dropDownContainerStyle={[
                        styles.dropDownContainer,
                        {
                          fontFamily: theme.fontFamily.LabGrotesqueRegular,
                          zIndex: 3000,
                        },
                      ]}
                      textStyle={{
                        color: theme.lightColor.textBlack,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      }}
                      onOpen={() => {
                        setFrameRateOpen(false);
                        setAudioQualityOpen(false);
                      }}
                      zIndex={3000}
                      zIndexInverse={1000}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: verticalScale(2),
                  }}>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    }}>
                    Frame Rate
                  </Text>
                  <View style={{marginBottom: 12}}>
                    <DropDownPicker
                      open={frameRateOpen}
                      value={frameRateValue}
                      items={frameRateItems}
                      setOpen={setFrameRateOpen}
                      setValue={setFrameRateValue}
                      setItems={setFrameRateItems}
                      itemSeparatorStyle={styles.itemSeparatorStyle}
                      itemSeparator={true}
                      placeholder="30fps"
                      style={styles.dropdownStyle}
                      dropDownContainerStyle={[
                        styles.dropDownContainer,
                        {
                          backgroundColor: theme.lightColor.textGray,
                          zIndex: 3000,
                        },
                      ]}
                      textStyle={{
                        color: theme.lightColor.textBlack,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      }}
                      onOpen={() => {
                        setResolutionOpen(false);
                        setAudioQualityOpen(false);
                      }}
                      zIndex={2000}
                      zIndexInverse={2000}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: verticalScale(2),
                  }}>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    }}>
                    Audio Quality
                  </Text>
                  <View style={{marginBottom: 12}}>
                    <DropDownPicker
                      open={audioQualityOpen}
                      value={audioQualityValue}
                      items={audioQualityItems}
                      setOpen={setAudioQualityOpen}
                      setValue={setAudioQualityValue}
                      setItems={setAudioQualityItems}
                      itemSeparatorStyle={styles.itemSeparatorStyle}
                      itemSeparator={true}
                      placeholder="Low"
                      style={styles.dropdownStyle}
                      dropDownContainerStyle={[
                        styles.dropDownContainer,
                        {
                          backgroundColor: theme.lightColor.textGray,
                          zIndex: 3000,
                        },
                      ]}
                      textStyle={{
                        color: theme.lightColor.textBlack,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      }}
                      onOpen={() => {
                        setResolutionOpen(false);
                        setFrameRateOpen(false);
                      }}
                      zIndex={1000}
                      zIndexInverse={3000}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.SubscriptionContainer}>
                <Text
                  style={{
                    color: theme.lightColor.textBlack,
                    fontFamily: theme.fontFamily.LabGrotesqueBold,
                    marginBottom: verticalScale(12),
                  }}>
                  Subscription
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SubscriptionScreen')}
                  style={[
                    styles.subscriptionMethod,
                    {
                      marginBottom: verticalScale(12),
                    },
                  ]}>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      fontSize: 12,
                    }}>
                    Subscription plan
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: theme.lightColor.textBlack,
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        fontSize: 12,
                      }}>
                      Premium
                    </Text>
                    <SvgXml
                      xml={Xmls.rightArrowIcon}
                      style={{marginLeft: horizontalScale(8)}}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.subscriptionMethod}>
                  <Text
                    style={{
                      color: theme.lightColor.textBlack,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      fontSize: 12,
                    }}>
                    Payment method
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: theme.lightColor.textBlack,
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        fontSize: 12,
                      }}>
                      Card ending ****1298
                    </Text>
                    <SvgXml
                      xml={Xmls.rightArrowIcon}
                      style={{marginLeft: horizontalScale(8)}}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  height: verticalScale(60),
                  width: '100%',
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
                    Save Changes
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUserData(false)}
                style={{marginVertical: verticalScale(20)}}>
                <MaskedView
                  maskElement={
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={[
                          styles.moreAppsText,
                          {backgroundColor: 'transparent'},
                        ]}>
                        Log out
                      </Text>
                    </View>
                  }>
                  <LinearGradient
                    colors={['#F1EA24', '#4CBA47']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      alignItems: 'center',
                      height: 30,
                    }}>
                    <Text style={[styles.moreAppsText, {opacity: 0}]}>
                      Log out
                    </Text>
                  </LinearGradient>
                </MaskedView>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </LinearWrapper>
  );
}

const CIRCLE_SIZE = horizontalScale(135);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(20),
    alignItems: 'center',
  },

  gradientBorder: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    padding: moderateScale(2),
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
  platformsContainer: {
    marginHorizontal: horizontalScale(12),
    height: verticalScale(380),
    width: '100%',
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(14),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  platformsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(46),
    // marginHorizontal: horizontalScale(8),
    borderWidth: moderateScale(2),
    borderColor: '#EFEFEF',
    paddingHorizontal: horizontalScale(12),
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(4),
  },
  livestreamSettingsContainer: {
    marginVertical: verticalScale(12),
    marginHorizontal: horizontalScale(12),
    // height: verticalScale(194),
    width: '100%',
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(14),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    zIndex: 3000,
  },

  dropdownStyle: {
    backgroundColor: theme.lightColor.textGray,
    width: horizontalScale(97),
    borderColor: 'transparent',
    borderRadius: moderateScale(8),
    height: verticalScale(39),
    color: theme.lightColor.textWhite,
  },
  itemSeparatorStyle: {
    // backgroundColor: theme.lightColor.textWhite,
    backgroundColor: '#8c8989',
    height: verticalScale(2),
  },

  dropDownContainer: {
    backgroundColor: theme.lightColor.textGray,
    borderColor: 'transparent',
    borderRadius: moderateScale(8),
    color: theme.lightColor.textWhite,
  },
  SubscriptionContainer: {
    marginBottom: verticalScale(12),
    marginHorizontal: horizontalScale(12),
    height: verticalScale(194),
    width: '100%',
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(14),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  subscriptionMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: horizontalScale(12),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    height: verticalScale(61),
    borderRadius: moderateScale(12),
    padding: verticalScale(20),
  },
  moreAppsText: {
    color: theme.lightColor.primary,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    fontSize: moderateScale(14),
  },
  editProfileContainer: {
    marginVertical: verticalScale(12),
    marginHorizontal: horizontalScale(20),
    height: verticalScale(260),
    width: '100%',
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(14),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
});
