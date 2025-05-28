import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import LinearWrapper from '../../components/ui/LinearWrapper';
import {theme} from '../../components/Theme';
import Xmls from '../../utils/Xmls';
import {SvgXml} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function OnBoardingScreen({navigation}) {
  const [showMore, setShowMore] = useState(false);

  const socialBtnData = [
    {icon: Xmls.youtubeIcon, title: 'Youtube'},
    {icon: Xmls.tiktokIcon, title: 'Tiktok'},
    {icon: Xmls.instagramIcon, title: 'Instagram'},
    {icon: Xmls.bigoIcon, title: 'BIGO'},
    {icon: Xmls.twitchIcon, title: 'Twitch'},
    {icon: Xmls.facebookIcon, title: 'Facebook'},
  ];

  return (
    <LinearWrapper>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <Image
            style={{
              width: horizontalScale(170),
              height: verticalScale(150),
              marginBottom: verticalScale(50),
            }}
            source={require('../../assets/images/logo.png')}
          />

          {socialBtnData.slice(0, 4).map((item, index) => (
            <TouchableOpacity key={index} style={style.socialBtn}>
              <SvgXml xml={item.icon} />
              <Text style={style.socialBtnText}>Sign in with {item.title}</Text>
            </TouchableOpacity>
          ))}

          {showMore &&
            socialBtnData.slice(4).map((item, index) => (
              <TouchableOpacity key={index} style={style.socialBtn}>
                <SvgXml xml={item.icon} />
                <Text style={style.socialBtnText}>
                  Sign in with {item.title}
                </Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity
            style={style.moreAppsBtn}
            onPress={() => setShowMore(!showMore)}>
            <MaskedView
              maskElement={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      style.moreAppsText,
                      {backgroundColor: 'transparent'},
                    ]}>
                    {showMore ? 'Hide Apps' : 'More Apps'}
                  </Text>
                  {!showMore && (
                    <View style={{width: 16, height: 16}}>
                      <SvgXml
                        xml={Xmls.dropdownIcon}
                        width="100%"
                        height="100%"
                      />
                    </View>
                  )}
                </View>
              }>
              <LinearGradient
                colors={['#F1EA24', '#4CBA47']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 30,
                }}>
                <Text style={[style.moreAppsText, {opacity: 0}]}>
                  {showMore ? 'Hide Apps' : 'More Apps'}
                </Text>
                {!showMore && (
                  <View style={{width: 16, height: 16}}>
                    <SvgXml
                      xml={Xmls.dropdownIcon}
                      width="100%"
                      height="100%"
                    />
                  </View>
                )}
              </LinearGradient>
            </MaskedView>
          </TouchableOpacity>

          <View style={style.dividerWrapper}>
            <View style={style.dividerLine} />
            <Text style={style.dividerText}>or continue with</Text>
            <View style={style.dividerLine} />
          </View>

          <View style={{width: '100%'}}>
            <LinearGradient
              colors={['#F1EA24', '#4CBA47']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={style.buttonWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={style.buttonInner}>
                <LinearGradient
                  colors={['#F1EA24', '#4CBA47']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={style.buttonGradient}>
                  <Text style={style.buttonText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={['#F1EA24', '#4CBA47']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[
                style.buttonWrapper,
                {
                  marginBottom: verticalScale(-4),
                },
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                activeOpacity={0.8}
                style={style.buttonInner}>
                <LinearGradient
                  colors={['#B01B74', '#1A1464']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  style={style.buttonGradient}>
                  <Text style={style.buttonText}>Sign up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>

            <Text style={style.termsText}>
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
  socialBtn: {
    width: '100%',
    height: verticalScale(60),
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(16),
  },
  socialBtnText: {
    marginLeft: horizontalScale(12),
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    fontSize: moderateScale(14),
  },
  moreAppsBtn: {
    marginBottom: verticalScale(16),
  },
  moreAppsText: {
    color: theme.lightColor.primary,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    fontSize: moderateScale(14),
    marginRight: horizontalScale(8),
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
  termsText: {
    color: theme.lightColor.textWhite,
    textAlign: 'center',
    fontSize: moderateScale(12),
    marginVertical: verticalScale(20),
  },
});
