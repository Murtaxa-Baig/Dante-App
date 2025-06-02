import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearWrapper from '../../components/ui/LinearWrapper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import {theme} from '../../components/Theme';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import LinearGradient from 'react-native-linear-gradient';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from '../../utils/hooks/MmkvHook';
import SocialLoginHook from '../../utils/hooks/SocialLoginHook';

export default function Login({navigation}) {
  const [userData, setUserData] = useMMKVStorage('userData', storage, false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFacebookLogin = async () => {
    setLoading(true);
    console.log('Facebook Login initiated');
    const {loginWithFacebook} = SocialLoginHook();
    try {
      const userCredential = await loginWithFacebook();
      console.log('Facebook Login Success:', userCredential.user);
      setUserData(userCredential?.user?._user);
      // console.log('user data is here', userCredential.user);

      setLoading(false);
    } catch (error) {
      console.error('Facebook Login Failed:', error);
      setLoading(false);
    }
  };

  const handleYoutubeLogin = () => {
    console.log('YouTube Login not implemented');
  };

  const handleTiktokLogin = () => {
    console.log('TikTok Login not implemented');
  };

  const handleInstagramLogin = () => {
    console.log('Instagram Login not implemented');
  };

  const handleBigoLogin = () => {
    console.log('BIGO Login not implemented');
  };

  const handleTwitchLogin = () => {
    console.log('Twitch Login not implemented');
  };

  const socialBtnData = [
    {icon: Xmls.youtubeIcon, title: 'Youtube', onPress: handleYoutubeLogin},
    {icon: Xmls.tiktokIcon, title: 'Tiktok', onPress: handleTiktokLogin},
    {
      icon: Xmls.instagramIcon,
      title: 'Instagram',
      onPress: handleInstagramLogin,
    },
    {icon: Xmls.bigoIcon, title: 'BIGO', onPress: handleBigoLogin},
    {icon: Xmls.twitchIcon, title: 'Twitch', onPress: handleTwitchLogin},
    {icon: Xmls.facebookIcon, title: 'Facebook', onPress: handleFacebookLogin},
  ];

  return (
    <LinearWrapper>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <Image
            style={{width: 170, height: 150}}
            source={require('../../assets/images/logo.png')}
          />
          <Text
            style={{
              color: theme.lightColor.textWhite,
              marginVertical: verticalScale(12),
            }}>
            Quick sign in with:
          </Text>
          <View style={style.iconsWrapper}>
            {socialBtnData.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  item.onPress();
                }}
                key={index}
                style={style.iconContainer}>
                <SvgXml xml={item.icon} />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: verticalScale(16),
            }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.lightColor.textWhite,
                marginHorizontal: moderateScale(8),
              }}
            />
            <Text
              style={{
                color: theme.lightColor.textWhite,
                fontSize: moderateScale(12),
              }}>
              or continue with
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.lightColor.textWhite,
                marginHorizontal: moderateScale(8),
              }}
            />
          </View>
          <View style={{width: '100%'}}>
            <TextInput
              style={style.inputStyle}
              placeholder="Email address"
              placeholderTextColor="#0000004A"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password input with icon using flexbox */}
            <View style={style.passwordWrapper}>
              <TextInput
                style={[style.inputStyle, {flex: 1, marginBottom: 0}]}
                placeholder="Password"
                placeholderTextColor="#0000004A"
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={style.eyeIconTouchable}>
                <SvgXml
                  xml={isPasswordVisible ? Xmls.ShowEyeIcon : Xmls.hideEyeIcon}
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
            </View>

            <LinearGradient
              colors={['#F1EA24', '#4CBA47']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '100%',
                borderRadius: moderateScale(12),
                padding: 3,
                marginBottom: verticalScale(16),
                marginTop: verticalScale(20),
              }}>
              <TouchableOpacity
                // onPress={() => setUserData(true)}
                style={{
                  height: verticalScale(60),
                  width: '100%',
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
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={theme.lightColor.textWhite}
                    />
                  ) : (
                    <Text style={style.buttonText}>Login</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={['#F1EA24', '#4CBA47']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '100%',
                borderRadius: moderateScale(12),
                padding: 3,
                // marginBottom: verticalScale(16),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                activeOpacity={0.8}
                style={{
                  height: verticalScale(60),
                  width: '100%',
                  borderRadius: moderateScale(9),
                  overflow: 'hidden',
                }}>
                <LinearGradient
                  colors={['#B01B74', '#1A1464']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(9),
                  }}>
                  <Text
                    style={{
                      color: '#F1EA24',
                      fontSize: 18,
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                    }}>
                    Sign up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>

            <Text
              style={{
                color: theme.lightColor.textWhite,
                textAlign: 'center',
                fontSize: moderateScale(12),
                marginVertical: verticalScale(16),
              }}>
              Terms of Service & Privacy Policy
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearWrapper>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(35),
  },
  iconsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    rowGap: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.lightColor.bgWhite,
    height: verticalScale(65),
    width: horizontalScale(65),
    borderRadius: moderateScale(12),
    marginHorizontal: 8,
    marginVertical: 8,
  },
  inputStyle: {
    height: verticalScale(60),
    backgroundColor: theme.lightColor.bgWhite,
    paddingHorizontal: horizontalScale(20),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    color: theme.lightColor.textBlack,
    fontSize: moderateScale(16),
  },
  passwordWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    height: verticalScale(60),
  },
  eyeIconTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(20),
  },
  buttonText: {
    color: theme.lightColor.textWhite,
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
  },
});
