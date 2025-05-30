import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LinearWrapper from '../../components/ui/LinearWrapper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import {theme} from '../../components/Theme';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import MaskedView from '@react-native-masked-view/masked-view';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from '../../utils/hooks/MmkvHook';
import SocialLoginHook from '../../utils/hooks/SocialLoginHook';

export default function SignUp({navigation}) {
  const [userData, setUserData] = useMMKVStorage('userData', storage, false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleFacebookLogin = async () => {
    setLoading(true);
    console.log('Facebook Login initiated');
    const {loginWithFacebook} = SocialLoginHook();
    try {
      const userCredential = await loginWithFacebook();
      console.log('Facebook Login Success:', userCredential.user);
      setUserData(userCredential.user);
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
          <View style={{alignItems: 'center'}}>
            <Image
              style={{
                width: horizontalScale(170),
                height: verticalScale(150),
                marginBottom: verticalScale(40),
              }}
              source={require('../../assets/images/logo.png')}
            />
          </View>
          <Text
            style={{
              color: theme.lightColor.bgWhite,
              marginBottom: verticalScale(12),
              fontFamily: theme.fontFamily.LabGrotesqueBold,
            }}>
            Sign up
          </Text>
          <TextInput
            style={style.inputStyle}
            placeholder="Full name"
            placeholderTextColor="#0000004A"
          />
          <TextInput
            style={style.inputStyle}
            placeholder="Email address"
            placeholderTextColor="#0000004A"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Field with eye icon */}
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

          {/* Confirm Password Field with eye icon */}
          <View style={style.passwordWrapper}>
            <TextInput
              style={[style.inputStyle, {flex: 1, marginBottom: 0}]}
              placeholder="Confirm Password"
              placeholderTextColor="#0000004A"
              secureTextEntry={!isConfirmPasswordVisible}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              style={style.eyeIconTouchable}>
              <SvgXml
                xml={
                  isConfirmPasswordVisible ? Xmls.ShowEyeIcon : Xmls.hideEyeIcon
                }
                width={20}
                height={20}
              />
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={['#F1EA24', '#4CBA47']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={style.buttonWrapper}>
            <TouchableOpacity style={style.buttonInner}>
              <LinearGradient
                colors={['#F1EA24', '#4CBA47']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={style.buttonGradient}>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={theme.lightColor.textWhite}
                  />
                ) : (
                  <Text style={style.buttonText}>Sign up</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
          <View style={style.dividerWrapper}>
            <View style={style.dividerLine} />
            <Text style={style.dividerText}>or continue sign up with</Text>
            <View style={style.dividerLine} />
          </View>
          <View style={style.iconsWrapper}>
            {socialBtnData.map((item, index) => (
              <TouchableOpacity
                onPress={() => item.onPress()}
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
              marginBottom: verticalScale(10),
            }}>
            <Text style={style.termsText}>Already have an account? </Text>

            {/* Gradient masked "Login" */}
            <MaskedView
              maskElement={
                <Text
                  style={[
                    style.termsText,
                    {
                      fontFamily: theme.fontFamily.LabGrotesqueBold,
                      backgroundColor: 'transparent',
                    },
                  ]}>
                  Login
                </Text>
              }>
              <LinearGradient
                colors={['#F1EA24', '#4CBA47']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={[
                      style.termsText,
                      {
                        opacity: 0,
                        fontFamily: theme.fontFamily.LabGrotesqueBold,
                      },
                    ]}>
                    Login
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </MaskedView>
          </View>
        </View>
      </ScrollView>
    </LinearWrapper>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(35),
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

  buttonWrapper: {
    width: '100%',
    borderRadius: moderateScale(12),
    padding: 3,
    marginBottom: verticalScale(16),
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
  },
  buttonText: {
    color: theme.lightColor.textWhite,
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
  },

  dividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(16),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.lightColor.textWhite,
    marginHorizontal: moderateScale(8),
  },
  dividerText: {
    color: theme.lightColor.textWhite,
    fontSize: moderateScale(12),
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

  termsText: {
    color: theme.lightColor.textWhite,
    textAlign: 'center',
    fontSize: moderateScale(12),
    marginVertical: verticalScale(12),
  },
});
