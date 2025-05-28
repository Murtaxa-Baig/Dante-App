import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import LinearWrapper from '../../components/ui/LinearWrapper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import DropDownPicker from 'react-native-dropdown-picker';
import AppHeader from '../../components/ui/AppHeader';
import {theme} from '../../components/Theme';
import ToggleSwitch from 'toggle-switch-react-native';

export default function GoLive({navigation}) {
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [audioQualityItems, setAudioQualityItems] = useState([
    {label: 'Low', value: 'low'},
    {label: 'Medium', value: 'medium'},
    {label: 'High', value: 'high'},
  ]);
  const socialPlatforms = [
    {name: 'YouTube', icon: Xmls.youtubeIcon},
    {name: 'TikTok', icon: Xmls.tiktokIcon},
    {name: 'Facebook', icon: Xmls.instagramIcon},
    {name: 'Bigo', icon: Xmls.bigoIcon},
  ];
  const [liveSetting, setLiveSetting] = useState(true);
  const [isGoLive, setIsGoLive] = useState(false);
  const [liveStreamStatus, setLiveStreamStatus] = useState(false);
  const [summaryScreen, setSummaryScreen] = useState(false);
  const [toggleStates, setToggleStates] = useState(
    socialPlatforms.map(() => false),
  );

  const socialIcon = [
    {icon: Xmls.youtubeIcon},
    {icon: Xmls.tiktokIcon},
    {icon: Xmls.bigoIcon},
    {icon: Xmls.instagramIcon},
    {icon: Xmls.twitchIcon},
    {icon: Xmls.facebookIcon},
  ];

  const socialIconLiveStream = [
    {icon: Xmls.youtubeIcon},
    {icon: Xmls.tiktokIcon},
    {icon: Xmls.bigoIcon},
    {icon: Xmls.facebookIcon},
    {icon: Xmls.addSocialItemIcon},
  ];

  const renderSocialItem = ({item}: any) => (
    <View style={styles.socialContainer}>
      <SvgXml xml={item.icon} width={30} height={30} />
    </View>
  );
  const renderSocialLiveStreamItem = ({item, index}: any) => (
    <View style={{alignItems: 'center'}}>
      {/* Status Text - Always rendered to preserve layout */}
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
          // Clean placeholder: no marginLeft, no dot, just height
          <View style={{height: 20}} /> // Adjust height to match text+dot
        )}
      </View>

      {/* Social Icon */}
      <View style={styles.socialContainer}>
        <SvgXml xml={item.icon} width={30} height={30} />
      </View>

      {/* Toggle Switch - Only show if not "Add Social" icon */}
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

  const toggleHandler = index => {
    const newStates = [...toggleStates];
    newStates[index] = !newStates[index];
    setToggleStates(newStates);
  };

  return (
    <LinearWrapper>
      {liveSetting && (
        <View style={styles.header}>
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
          <Text style={styles.username}>Start Livestream</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <SvgXml xml={Xmls.settingIcon} />
          </TouchableOpacity>
        </View>
      )}
      {isGoLive && <AppHeader navigation={navigation} />}
      {summaryScreen && <AppHeader navigation={navigation} />}
      <ScrollView contentContainerStyle={{paddingBottom: verticalScale(64)}}>
        {liveSetting && (
          <>
            {/* <View style={styles.header}>
              <LinearGradient
                colors={['#F1EA24', '#4CBA47']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBorder}>
                <View style={styles.innerCircle} />
              </LinearGradient>
              <Text style={styles.username}>Start Livestream</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingScreen')}>
                <SvgXml xml={Xmls.settingIcon} />
              </TouchableOpacity>
            </View> */}
            <View style={styles.container}>
              {/* <View style={styles.header}>
                <LinearGradient
                  colors={['#F1EA24', '#4CBA47']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}>
                  <View style={styles.innerCircle} />
                </LinearGradient>
                <Text style={styles.username}>Start Livestream</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SettingScreen')}>
                  <SvgXml xml={Xmls.settingIcon} />
                </TouchableOpacity>
              </View> */}
            </View>

            <Text
              style={{
                marginHorizontal: horizontalScale(20),
                marginTop: verticalScale(8),
                color: theme.lightColor.textWhite,
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
              }}>
              Selected Platforms
            </Text>

            <FlatList
              horizontal
              data={socialIcon}
              renderItem={renderSocialItem}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={styles.flatListContainer}
              showsHorizontalScrollIndicator={false}
              style={{marginLeft: horizontalScale(-4)}}
            />

            <View style={styles.liveStreamSettingContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Title Field"
                placeholderTextColor="#0000004A"
              />
              <TextInput
                style={styles.descStyle}
                placeholder="Description"
                placeholderTextColor="#0000004A"
                multiline={true}
              />
              <Text
                style={{
                  color: theme.lightColor.textWhite,
                  fontFamily: theme.fontFamily.LabGrotesqueRegular,
                }}>
                Stream Settings
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: verticalScale(4),
                }}>
                <Text
                  style={{
                    color: theme.lightColor.textWhite,
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
                    placeholder="480p"
                    arrowIconStyle={{tintColor: '#fff'}}
                    style={[
                      styles.dropdownStyle,
                      {
                        backgroundColor: theme.lightColor.textGray,
                      },
                    ]}
                    dropDownContainerStyle={[
                      styles.dropDownContainer,
                      {
                        backgroundColor: theme.lightColor.textGray,
                        zIndex: 3000,
                      },
                    ]}
                    textStyle={{
                      color: theme.lightColor.textWhite,
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
                  marginVertical: verticalScale(4),
                }}>
                <Text
                  style={{
                    color: theme.lightColor.textWhite,
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
                    arrowIconStyle={{tintColor: '#fff'}}
                    placeholder="30fps"
                    style={[
                      styles.dropdownStyle,
                      {
                        backgroundColor: theme.lightColor.textGray,
                      },
                    ]}
                    dropDownContainerStyle={[
                      styles.dropDownContainer,
                      {
                        backgroundColor: theme.lightColor.textGray,
                        zIndex: 2000,
                      },
                    ]}
                    textStyle={{
                      color: theme.lightColor.textWhite,
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
                  marginVertical: verticalScale(4),
                }}>
                <Text
                  style={{
                    color: theme.lightColor.textWhite,
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
                    arrowIconStyle={{tintColor: '#fff'}}
                    placeholder="Low"
                    style={[
                      styles.dropdownStyle,
                      {
                        backgroundColor: theme.lightColor.textGray,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                      },
                    ]}
                    dropDownContainerStyle={[
                      styles.dropDownContainer,
                      {
                        backgroundColor: theme.lightColor.textGray,
                        zIndex: 1000,
                      },
                    ]}
                    textStyle={{
                      color: theme.lightColor.textWhite,
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: verticalScale(10),
                }}>
                <View style={styles.thumbnail}>
                  <Text
                    style={{
                      color: theme.lightColor.textGray,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    }}>
                    Thumbnail upload
                  </Text>
                  <SvgXml xml={Xmls.uploadIcon} />
                </View>
                <TouchableOpacity style={styles.uploadBtn}>
                  <SvgXml xml={Xmls.imageIcon} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: verticalScale(20),
                }}>
                <View style={{width: horizontalScale(155)}}>
                  <TextInput
                    style={styles.socialInput}
                    placeholder="Youtube"
                    placeholderTextColor="#0000004A"
                  />
                  <TextInput
                    style={styles.socialInput}
                    placeholder="Tiktok"
                    placeholderTextColor="#0000004A"
                  />
                  <TextInput
                    style={styles.socialInput}
                    placeholder="Instagram"
                    placeholderTextColor="#0000004A"
                  />
                </View>
                <View style={styles.previewContainer}>
                  <Text
                    style={{
                      color: theme.lightColor.textWhite,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    }}>
                    Preview Window
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsGoLive(true);
                  setLiveSetting(false);
                }}
                style={{
                  height: verticalScale(60),
                  width: '100%',
                  borderRadius: moderateScale(9),
                  marginVertical: verticalScale(6),
                }}>
                <LinearGradient
                  colors={['#F1EA24', '#4CBA47']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(9),
                  }}>
                  <Text
                    style={{
                      color: theme.lightColor.textWhite,
                      fontSize: 18,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                    }}>
                    Go Live
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <LinearGradient
                colors={['#F1EA24', '#4CBA47']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  activeOpacity={0.8}
                  style={styles.buttonInner}>
                  <View style={styles.buttonGradient}>
                    <Text style={styles.buttonText}>Schedule for Later</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={['#EB5C20', '#B3176B', '#AA176B', '#1A1464']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  activeOpacity={0.8}
                  style={styles.buttonInner}>
                  <View style={styles.buttonGradient}>
                    <Text style={styles.cancelBtn}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </>
        )}

        {isGoLive && (
          <>
            {/* <AppHeader navigation={navigation} /> */}
            <View
              style={[
                styles.liveStreamStatus,
                {
                  height: liveStreamStatus
                    ? verticalScale(241)
                    : verticalScale(56),
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
                      liveStreamStatus
                        ? Xmls.dropUpIcon
                        : Xmls.dropdownIconWhite
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
            <View style={styles.liveScreen}>
              <KeyboardAvoidingView style={{flex: 1}}>
                {/* Top stats bar */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.statsBar}>
                    {/* LIVE Badge */}
                    <View style={styles.liveBadge}>
                      <LinearGradient
                        colors={['#F1EA24', '#4CBA47']}
                        style={styles.statusDot}
                      />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>

                    {/* Icons and Stats */}
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
                  </View>
                </ScrollView>

                {/* Comments + Comment Hide icon */}

                <View style={styles.commentsWrapper}>
                  <ScrollView
                    style={styles.commentsScroll}
                    contentContainerStyle={{paddingBottom: 20}}>
                    {Array(3)
                      .fill(null)
                      .map((_, index) => (
                        <View key={index} style={styles.commentRow}>
                          <View style={styles.commentProfileView} />
                          <Text style={styles.commentText}>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Really enjoying this stream!"
                          </Text>
                        </View>
                      ))}
                  </ScrollView>

                  {/* Hide Icon */}
                  <View style={styles.commentHideIcon}>
                    <SvgXml xml={Xmls.commentHide} />
                  </View>
                </View>

                {/* Comment input */}
                <TextInput
                  style={styles.commentField}
                  placeholder="Comment"
                  placeholderTextColor="#FFFFFF"
                />
              </KeyboardAvoidingView>
            </View>
          </>
        )}

        {summaryScreen && (
          <>
            {/* <ScrollView
              contentContainerStyle={{paddingBottom: verticalScale(30)}}> */}
            {/* <AppHeader navigation={navigation} /> */}
            <View style={styles.Performance}>
              <Text style={styles.streamText}>Stream Performance Overview</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: verticalScale(12),
                }}>
                <View style={styles.viewConatiner}>
                  <Text
                    style={{
                      color: theme.lightColor.textWhite,
                      fontSize: 20,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                      marginVertical: verticalScale(4),
                    }}>
                    90k
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: theme.lightColor.textWhite,
                          fontFamily: theme.fontFamily.LabGrotesqueRegular,
                          marginBottom: verticalScale(-4),
                        }}>
                        Total
                      </Text>
                      <Text
                        style={{
                          color: theme.lightColor.textWhite,
                          fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        }}>
                        engagement
                      </Text>
                    </View>
                    <SvgXml xml={Xmls.likeIcon} height={22} width={22} />
                  </View>
                </View>
                <View style={styles.viewConatiner}>
                  <Text
                    style={{
                      color: theme.lightColor.textWhite,
                      fontSize: 20,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                      marginVertical: verticalScale(4),
                    }}>
                    120k
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: theme.lightColor.textWhite,
                          fontFamily: theme.fontFamily.LabGrotesqueRegular,
                          marginBottom: verticalScale(-4),
                        }}>
                        Total
                      </Text>
                      <Text
                        style={{
                          color: theme.lightColor.textWhite,
                          fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        }}>
                        Viewers
                      </Text>
                    </View>
                    <SvgXml xml={Xmls.viewIcon} height={22} width={22} />
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: verticalScale(4),
                }}>
                <View style={styles.socialViewContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SvgXml xml={Xmls.instagramIcon} height={20} width={20} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        color: theme.lightColor.textWhite,
                        marginLeft: horizontalScale(4),
                      }}>
                      Instagram
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      25k
                    </Text>
                    <SvgXml xml={Xmls.viewIcon} height={18} width={18} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      75k
                    </Text>
                    <SvgXml xml={Xmls.likeIcon} height={18} width={18} />
                  </View>
                </View>
                <View style={styles.socialViewContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SvgXml xml={Xmls.youtubeIcon} height={20} width={20} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        color: theme.lightColor.textWhite,
                        marginLeft: horizontalScale(4),
                      }}>
                      Youtube
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      25k
                    </Text>
                    <SvgXml xml={Xmls.viewIcon} height={18} width={18} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      75k
                    </Text>
                    <SvgXml xml={Xmls.likeIcon} height={18} width={18} />
                  </View>
                </View>
                <View style={styles.socialViewContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SvgXml xml={Xmls.tiktokIcon} height={20} width={20} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        color: theme.lightColor.textWhite,
                        marginLeft: horizontalScale(4),
                      }}>
                      Tiktok
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      25k
                    </Text>
                    <SvgXml xml={Xmls.viewIcon} height={18} width={18} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      75k
                    </Text>
                    <SvgXml xml={Xmls.likeIcon} height={18} width={18} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: verticalScale(4),
                }}>
                <View style={styles.socialViewContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SvgXml xml={Xmls.bigoIcon} height={20} width={20} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        color: theme.lightColor.textWhite,
                        marginLeft: horizontalScale(4),
                      }}>
                      BIGO
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      25k
                    </Text>
                    <SvgXml xml={Xmls.viewIcon} height={18} width={18} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      75k
                    </Text>
                    <SvgXml xml={Xmls.likeIcon} height={18} width={18} />
                  </View>
                </View>
                <View style={styles.socialViewContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SvgXml xml={Xmls.facebookIcon} height={20} width={20} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        color: theme.lightColor.textWhite,
                        marginLeft: horizontalScale(4),
                      }}>
                      Facebook
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      25k
                    </Text>
                    <SvgXml xml={Xmls.viewIcon} height={18} width={18} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      75k
                    </Text>
                    <SvgXml xml={Xmls.likeIcon} height={18} width={18} />
                  </View>
                </View>
                <View style={styles.socialViewContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SvgXml xml={Xmls.twitchIcon} height={20} width={20} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: theme.fontFamily.LabGrotesqueRegular,
                        color: theme.lightColor.textWhite,
                        marginLeft: horizontalScale(4),
                      }}>
                      twitch
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      25k
                    </Text>
                    <SvgXml xml={Xmls.viewIcon} height={18} width={18} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                        color: theme.lightColor.textWhite,
                        marginRight: horizontalScale(4),
                      }}>
                      75k
                    </Text>
                    <SvgXml xml={Xmls.likeIcon} height={18} width={18} />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: horizontalScale(25),
              }}>
              <Text
                style={{
                  color: theme.lightColor.textWhite,
                  fontFamily: theme.fontFamily.LabGrotesqueBold,
                }}>
                Save Recording
              </Text>
              <SvgXml xml={Xmls.dropdownIconWhite} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: verticalScale(8),
                marginHorizontal: horizontalScale(20),
              }}>
              <TouchableOpacity
                // onPress={() => setUserData(true)}
                style={{
                  height: verticalScale(60),
                  width: '48%',
                  borderRadius: moderateScale(9),
                  overflow: 'hidden',
                }}>
                <LinearGradient
                  colors={['#F1EA24', '#4CBA47']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(9),
                  }}>
                  <Text
                    style={{
                      color: theme.lightColor.textWhite,
                      fontSize: 18,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                    }}>
                    This Device
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <LinearGradient
                colors={['#F1EA24', '#4CBA47']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  width: '48%',
                  borderRadius: moderateScale(12),
                  padding: 3,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  activeOpacity={0.8}
                  style={{
                    height: verticalScale(57),
                    width: '100%',
                    borderRadius: moderateScale(9),
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: moderateScale(9),
                      backgroundColor: '#921A71',
                    }}>
                    <Text
                      style={{
                        // color: theme.lightColor.textWhite,
                        color: '#F1EA24',
                        fontSize: 18,
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                      }}>
                      Cloud
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <TouchableOpacity
              style={{
                height: verticalScale(60),
                marginTop: verticalScale(8),
                marginHorizontal: horizontalScale(20),
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
                  Analytics
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <LinearGradient
              colors={['#F1EA24', '#4CBA47']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                // width: '100%',
                marginTop: verticalScale(12),
                borderRadius: moderateScale(12),
                padding: 3,
                marginHorizontal: horizontalScale(20),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                activeOpacity={0.8}
                style={{
                  height: verticalScale(57),
                  width: '100%',
                  borderRadius: moderateScale(9),
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(9),
                    backgroundColor: '#921A71',
                  }}>
                  <Text
                    style={{
                      // color: theme.lightColor.textWhite,
                      color: '#F1EA24',
                      fontSize: 18,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                    }}>
                    Share
                  </Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            {/* </ScrollView> */}
          </>
        )}

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
                    setIsGoLive(false);
                    // setLiveSetting(true);
                    setIsModalVisible(false);
                    setSummaryScreen(true);
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
                    setIsGoLive(false);
                    // setLiveSetting(true);
                    setIsModalVisible(false);
                    setSummaryScreen(true);
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
                      setIsGoLive(false);
                      // setLiveSetting(true);
                      setIsModalVisible(false);
                      setSummaryScreen(true);
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

const CIRCLE_SIZE = horizontalScale(48);
const COMMENT_CIRCLE_SIZE = horizontalScale(34);
const SOCIAL_CIRCLE_SIZE = horizontalScale(58);

const styles = StyleSheet.create({
  container: {
    // paddingTop: horizontalScale(60),
    // paddingHorizontal: horizontalScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(42),
    marginHorizontal: horizontalScale(20),
    marginBottom: verticalScale(12),
  },
  username: {
    color: theme.lightColor.textWhite,
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  flatListContainer: {
    paddingLeft: horizontalScale(25),
    marginTop: verticalScale(15),
    paddingRight: horizontalScale(25),
  },
  liveStreamSettingContainer: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(15),
    backgroundColor: theme.lightColor.textBlack,
    borderRadius: moderateScale(24),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(12),
  },

  inputStyle: {
    width: '100%',
    height: verticalScale(60),
    backgroundColor: theme.lightColor.bgWhite,
    padding: verticalScale(20),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },
  descStyle: {
    width: '100%',
    height: 135,
    backgroundColor: theme.lightColor.bgWhite,
    padding: verticalScale(20),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    textAlignVertical: 'top',
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },
  dropdownStyle: {
    backgroundColor: theme.lightColor.textGray,
    width: horizontalScale(97),
    borderColor: 'transparent',
    borderRadius: moderateScale(8),
    height: verticalScale(40),
    color: theme.lightColor.textWhite,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },

  dropDownContainer: {
    backgroundColor: theme.lightColor.textGray,
    borderColor: 'transparent',
    borderRadius: moderateScale(8),
    color: theme.lightColor.textWhite,
  },
  thumbnail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: horizontalScale(220),
    height: verticalScale(65),
    backgroundColor: theme.lightColor.bgWhite,
    padding: verticalScale(20),
    borderRadius: moderateScale(12),
  },
  uploadBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(78),
    height: verticalScale(65),
    backgroundColor: '#D9D9D9',
    borderRadius: moderateScale(12),
  },
  socialInput: {
    width: '100%',
    height: verticalScale(60),
    backgroundColor: theme.lightColor.bgWhite,
    padding: verticalScale(20),
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(6),
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },
  previewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: theme.lightColor.bgWhite,
    backgroundColor: theme.lightColor.textGray,
    height: verticalScale(226),
    width: horizontalScale(138),
    borderRadius: moderateScale(12),
  },

  buttonWrapper: {
    width: '100%',
    borderRadius: moderateScale(12),
    padding: 3,
    marginVertical: verticalScale(6),
  },
  buttonInner: {
    height: verticalScale(60),
    width: '100%',
    borderRadius: moderateScale(9),
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(9),
    backgroundColor: theme.lightColor.textBlack,
  },
  buttonText: {
    color: '#F1EA24',
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
  },
  cancelBtn: {
    color: '#D82D7E',
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
  },

  // Live Stream style is here
  liveStreamStatus: {
    height: verticalScale(56),
    // marginTop: verticalScale(8),
    marginHorizontal: horizontalScale(20),
    backgroundColor: theme.lightColor.bgLightBlack,
    borderRadius: moderateScale(24),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  flatListstatusContainer: {
    marginTop: verticalScale(8),
  },

  statusDot: {
    height: verticalScale(10),
    width: horizontalScale(10),
    borderRadius: moderateScale(10),
  },

  toggleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtn: {
    width: horizontalScale(37),
    height: verticalScale(28),
    backgroundColor: '#E4E4E4',
    borderRadius: moderateScale(17),
    paddingHorizontal: horizontalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContainerLiveStream: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: theme.lightColor.bgWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveScreen: {
    flex: 1,
    height: verticalScale(600),
    backgroundColor: '#000',
    marginHorizontal: horizontalScale(20),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(24),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(20),
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(34),
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
  commentSection: {
    flexDirection: 'row',
    height: verticalScale(155),
  },

  commentsWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(140),
    marginBottom: verticalScale(10),
  },
  commentsScroll: {
    flex: 1,
  },
  commentProfileView: {
    height: COMMENT_CIRCLE_SIZE,
    width: COMMENT_CIRCLE_SIZE,
    borderRadius: COMMENT_CIRCLE_SIZE / 2,
    backgroundColor: theme.lightColor.bgWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(3),
  },
  commentField: {
    width: '100%',
    height: verticalScale(60),
    backgroundColor: '#333333',
    padding: verticalScale(20),
    borderRadius: moderateScale(12),
    color: theme.lightColor.textWhite,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
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

  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(8),
    marginBottom: verticalScale(4),
    width: '90%',
  },

  commentText: {
    fontSize: 12,
    color: 'white',
    marginLeft: horizontalScale(6),
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },
  commentsWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: verticalScale(125),
    marginBottom: verticalScale(8),
  },

  commentsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  commentHideIcon: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(100),
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
  Performance: {
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(12),
    height: verticalScale(383),
    backgroundColor: '#171717',
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  streamText: {
    color: theme.lightColor.textWhite,
    textAlign: 'center',
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    marginVertical: verticalScale(8),
  },
  viewConatiner: {
    width: horizontalScale(150),
    height: verticalScale(89),
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
    backgroundColor: '#454545',
  },
  socialViewContainer: {
    width: horizontalScale(93),
    height: verticalScale(93),
    backgroundColor: '#232323',
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(6),
    paddingVertical: verticalScale(6),
    // textAlign: 'center',
  },
  itemSeparatorStyle: {
    backgroundColor: '#8c8989',
    height: verticalScale(2),
  },
});
