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
  Alert,
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
import {theme} from '../../components/Theme';
import Permission from '../../utils/hooks/Permission';

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

  const [audioQualityItems, setAudioQualityItems] = useState([
    {label: 'Low', value: 'low'},
    {label: 'Medium', value: 'medium'},
    {label: 'High', value: 'high'},
  ]);

  const socialIcon = [
    {icon: Xmls.youtubeIcon},
    {icon: Xmls.tiktokIcon},
    {icon: Xmls.bigoIcon},
    {icon: Xmls.instagramIcon},
    {icon: Xmls.twitchIcon},
    {icon: Xmls.facebookIcon},
  ];

  const renderSocialItem = ({item}) => (
    <View style={styles.socialContainer}>
      <SvgXml xml={item.icon} width={30} height={30} />
    </View>
  );

  const checkPermission = async () => {
    const {requestPermission} = Permission();
    const granted = await requestPermission();
    if (granted) {
      navigation.navigate('LiveStreaming');
    } else {
      Alert.alert('Error', 'Camera permission required.');
    }
  };

  return (
    <LinearWrapper>
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
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <SvgXml xml={Xmls.settingIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: verticalScale(64)}}>
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
            onPress={() => checkPermission()}
            // onPress={() => navigation.navigate('LiveStreaming')}
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
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonInner}>
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
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonInner}>
              <View style={styles.buttonGradient}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(34),
  },

  iconText: {
    color: theme.lightColor.textWhite,
    marginLeft: horizontalScale(4),
  },
  commentSection: {
    flexDirection: 'row',
    height: verticalScale(155),
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

  itemSeparatorStyle: {
    backgroundColor: '#8c8989',
    height: verticalScale(2),
  },
});
