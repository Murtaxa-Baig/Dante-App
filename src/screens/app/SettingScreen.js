import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearWrapper from '../../components/ui/LinearWrapper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../components/Theme';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import ToggleSwitch from 'toggle-switch-react-native';

export default function SettingScreen({navigation}) {
  const [favCreaterGoLive, setFavCreaterGoLive] = useState(false);
  const [trendingStreamStart, setTrendingStreamStart] = useState(false);
  const [commentOnLiveStream, setCommentOnLiveStream] = useState(false);
  const [notifyHighlightedComment, setNotifyHighlightedComment] =
    useState(false);
  const [notifyLikeMilestone, setNotifyLikeMilestone] = useState(false);
  const [notifyEveryLike, setNotifyEveryLike] = useState(false);
  const [muteEveryLike, setMuteEveryLike] = useState(false);
  const [displayLiveStreamOnFB, setDisplayLiveStreamOnFB] = useState(false);
  const [shareProfileDetailWithFb, setShareProfileDetailWithFb] =
    useState(false);
  const [displayLiveStreamOnTiktok, setDisplayLiveStreamOnTiktok] =
    useState(false);
  const [shareProfileDetailWithTiktok, setShareProfileDetailWithTiktok] =
    useState(false);
  const [displayLiveStreamOnYT, setDisplayLiveStreamOnYT] = useState(false);
  const [shareProfileDetailWithYT, setShareProfileDetailWithYT] =
    useState(false);
  const [displayLiveStreamOnBIGO, setDisplayLiveStreamOnBIGO] = useState(false);
  const [shareProfileDetailWithBIGO, setShareProfileDetailWithBIGO] =
    useState(false);
  const [displayLiveStreamOnTwitch, setDisplayLiveStreamOnTwitch] =
    useState(false);
  const [shareProfileDetailWithTwitch, setShareProfileDetailWithTwitch] =
    useState(false);
  const [displayLiveStreamOnInsta, setDisplayLiveStreamOnInsta] =
    useState(false);
  const [shareProfileDetailWithInsta, setShareProfileDetailWithInsta] =
    useState(false);
  return (
    <LinearWrapper>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: '20%',
                height: verticalScale(24),
              }}>
              <SvgXml xml={Xmls.backArrowIcon} />
            </TouchableOpacity>
            {/* <LinearGradient
              colors={['#F1EA24', '#4CBA47']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientBorder}>
              <View style={styles.innerCircle} />
            </LinearGradient> */}
            <Text style={styles.title}>Settings</Text>
            {/* <SvgXml xml={Xmls.settingIcon} /> */}
          </View>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Edit Profile</Text>
            <View style={styles.subscriptionMethod}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>johnsmith@mail.com</Text>
            </View>
            <View style={styles.subscriptionMethod}>
              <Text style={styles.label}>Password</Text>
              <Text style={styles.value}>************</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Notification Preferences</Text>
          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Live Updates</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Notify me when my favorite creators go live
              </Text>
              <ToggleSwitch
                isOn={favCreaterGoLive}
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
                onToggle={() => setFavCreaterGoLive(!favCreaterGoLive)}
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Notify me when trending streams start
              </Text>
              <ToggleSwitch
                isOn={trendingStreamStart}
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
                onToggle={() => setTrendingStreamStart(!trendingStreamStart)}
              />
            </View>
          </View>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Comments</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Notify me when someone comments on my livestream
              </Text>
              <ToggleSwitch
                isOn={commentOnLiveStream}
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
                onToggle={() => setCommentOnLiveStream(!commentOnLiveStream)}
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Notify me about top or highlighted comments
              </Text>
              <ToggleSwitch
                isOn={notifyHighlightedComment}
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
                onToggle={() =>
                  setNotifyHighlightedComment(!notifyHighlightedComment)
                }
              />
            </View>
          </View>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Likes</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Notify me when my livestream hits a milestone (e.g., 100 likes)
              </Text>
              <ToggleSwitch
                isOn={notifyLikeMilestone}
                onToggle={() => setNotifyLikeMilestone(!notifyLikeMilestone)}
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Notify me for every like/reaction
              </Text>
              <ToggleSwitch
                isOn={notifyEveryLike}
                onToggle={() => setNotifyEveryLike(!notifyEveryLike)}
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Mute all like/reaction notifications
              </Text>
              <ToggleSwitch
                isOn={muteEveryLike}
                onToggle={() => setMuteEveryLike(!muteEveryLike)}
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>
          </View>

          <Text style={styles.sectionLabel}>Privacy Settings</Text>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Facebook</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Display my livestreams on Facebook.
              </Text>
              <ToggleSwitch
                isOn={displayLiveStreamOnFB}
                onToggle={() =>
                  setDisplayLiveStreamOnFB(!displayLiveStreamOnFB)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Share my profile details (e.g., username, bio) with Facebook.
              </Text>
              <ToggleSwitch
                isOn={shareProfileDetailWithFb}
                onToggle={() =>
                  setShareProfileDetailWithFb(!shareProfileDetailWithFb)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>
          </View>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Tiktok</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Display my livestreams on Tiktok.
              </Text>
              <ToggleSwitch
                isOn={displayLiveStreamOnTiktok}
                onToggle={() =>
                  setDisplayLiveStreamOnTiktok(!displayLiveStreamOnTiktok)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Share my profile details (e.g., username, bio) with Tiktok.
              </Text>
              <ToggleSwitch
                isOn={shareProfileDetailWithTiktok}
                onToggle={() =>
                  setShareProfileDetailWithTiktok(!shareProfileDetailWithTiktok)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>
          </View>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Youtube</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Display my streams on my linked YouTube channel.
              </Text>
              <ToggleSwitch
                isOn={displayLiveStreamOnYT}
                onToggle={() =>
                  setDisplayLiveStreamOnYT(!displayLiveStreamOnYT)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Share my viewer count publicly on YouTube
              </Text>
              <ToggleSwitch
                isOn={shareProfileDetailWithYT}
                onToggle={() =>
                  setShareProfileDetailWithYT(!shareProfileDetailWithYT)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>
          </View>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>BIGO</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Display my livestreams on BIGO.
              </Text>
              <ToggleSwitch
                isOn={displayLiveStreamOnBIGO}
                onToggle={() =>
                  setDisplayLiveStreamOnBIGO(!displayLiveStreamOnBIGO)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Share my profile details (e.g., username, bio) with BIGO.
              </Text>
              <ToggleSwitch
                isOn={shareProfileDetailWithBIGO}
                onToggle={() =>
                  setShareProfileDetailWithBIGO(!shareProfileDetailWithBIGO)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>
          </View>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Twitch</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Display my livestreams on Twitch.
              </Text>
              <ToggleSwitch
                isOn={displayLiveStreamOnTwitch}
                onToggle={() =>
                  setDisplayLiveStreamOnTwitch(!displayLiveStreamOnTwitch)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Share my profile details (e.g., username, bio) with Twitch.
              </Text>
              <ToggleSwitch
                isOn={shareProfileDetailWithTwitch}
                onToggle={() =>
                  setShareProfileDetailWithTwitch(!shareProfileDetailWithTwitch)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>
          </View>

          <View style={styles.editProfileContainer}>
            <Text style={styles.sectionTitle}>Instagram</Text>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Display my livestreams on Instagram.
              </Text>
              <ToggleSwitch
                isOn={displayLiveStreamOnInsta}
                onToggle={() =>
                  setDisplayLiveStreamOnInsta(!displayLiveStreamOnInsta)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>

            <View style={styles.subscriptionMethod}>
              <Text style={styles.description}>
                Share my profile details (e.g., username, bio) with Instagram.
              </Text>
              <ToggleSwitch
                isOn={shareProfileDetailWithInsta}
                onToggle={() =>
                  setShareProfileDetailWithInsta(!shareProfileDetailWithInsta)
                }
                onColor="#4cd137"
                offColor="#dcdde1"
                size="medium"
              />
            </View>
          </View>

          <Text
            style={[
              styles.sectionLabel,
              // {marginHorizontal: horizontalScale(12)},
            ]}>
            Privacy Settings
          </Text>

          <Text
            style={{
              fontFamily: theme.fontFamily.LabGrotesqueRegular,
              marginHorizontal: horizontalScale(8),
              color: theme.lightColor.textWhite,
            }}>
            Find answers to common questions.
          </Text>

          <Text
            style={[
              styles.sectionLabel,
              {
                marginVertical: verticalScale(20),
              },
            ]}>
            Getting Started
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(8),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              How do I create an account?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(8),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              How do I start my first livestream?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(8),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              How do I customize my profile?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>

          <Text
            style={[
              styles.sectionLabel,
              {
                marginVertical: verticalScale(20),
              },
            ]}>
            Livestreaming Features
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(8),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              How do I invite viewers to my stream?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(8),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              How can I moderate comments?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(8),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              How do I enable/disable livestream notifications?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>

          <Text
            style={[
              styles.sectionLabel,
              {
                marginVertical: verticalScale(20),
              },
            ]}>
            Technical Support
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(8),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              What should I do if my livestream keeps buffering?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(8),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              How do I report a bug or glitch?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: horizontalScale(8),
              marginBottom: verticalScale(20),
            }}>
            <Text
              style={{
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                color: theme.lightColor.textWhite,
                fontSize: 12,
              }}>
              Which devices and operating systems are supported?
            </Text>
            <SvgXml xml={Xmls.dropdownIconWhite} />
          </View>
        </View>
      </ScrollView>
    </LinearWrapper>
  );
}

const CIRCLE_SIZE = horizontalScale(48);

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(60),
    paddingHorizontal: horizontalScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: horizontalScale(20),
    marginBottom: verticalScale(12),
  },
  title: {
    width: '90%',
    textAlign: 'center',
    marginLeft: horizontalScale(-40),
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
  },
  editProfileContainer: {
    marginVertical: verticalScale(6),
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
    borderWidth: 1,
    borderColor: '#EFEFEF',
    height: verticalScale(61),
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(20),
    marginVertical: verticalScale(6),
  },

  toggleBtn: {
    width: horizontalScale(37),
    height: verticalScale(28),
    backgroundColor: '#E4E4E4',
    borderRadius: moderateScale(17),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    marginBottom: verticalScale(12),
  },
  sectionLabel: {
    color: theme.lightColor.textWhite,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    fontSize: 14,
    marginVertical: verticalScale(6),
    marginHorizontal: horizontalScale(8),
  },
  label: {
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
    fontSize: 12,
  },
  value: {
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    fontSize: 12,
  },
  description: {
    color: theme.lightColor.textLightBlack,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
    fontSize: 12,
    width: horizontalScale(218),
  },
});
