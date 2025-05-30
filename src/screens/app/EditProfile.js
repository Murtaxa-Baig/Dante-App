import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from '../../utils/hooks/MmkvHook';
import {getApp} from '@react-native-firebase/app';
import {getAuth, signOut} from '@react-native-firebase/auth';

export default function EditProfile({navigation}) {
  const [userData, setUserData] = useMMKVStorage('userData', storage);
  const [name, setName] = useState(userData?.displayName || '');
  const [loading, setLoading] = useState(false);

  const handleSaveName = async () => {
    setLoading(true);
    try {
      const firebaseApp = getApp();
      const auth = getAuth(firebaseApp);

      const user = auth.currentUser;

      if (!user) {
        console.error('No user is logged in.');
        setLoading(false);
        return;
      }

      await user.updateProfile({displayName: name});

      const updatedData = {
        ...userData,
        displayName: name,
      };

      setUserData(updatedData);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating name:', error);
      setLoading(false);
    }
  };

  return (
    <LinearWrapper>
      <View
        style={[
          styles.container,
          {
            paddingTop: horizontalScale(42),
          },
        ]}>
        <View style={{width: '100%', alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: horizontalScale(24),
              height: verticalScale(24),
            }}>
            <SvgXml xml={Xmls.backArrowIcon} />
          </TouchableOpacity>
        </View>

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
          {userData?.displayName}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: theme.lightColor.textWhite,
              fontFamily: theme.fontFamily.LabGrotesqueRegular,
            }}>
            {userData?.displayName}
          </Text>
          <View
            style={{
              width: horizontalScale(2),
              height: horizontalScale(16),
              backgroundColor: theme.lightColor.textGray,
              marginHorizontal: horizontalScale(4),
            }}
          />
          <Text
            style={{
              color: theme.lightColor.textWhite,
              fontFamily: theme.fontFamily.LabGrotesqueRegular,
            }}>
            14k followers
          </Text>
        </View>
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
            {/* <Text
              style={{
                color: theme.lightColor.textBlack,
                fontFamily: theme.fontFamily.LabGrotesqueBold,
                fontSize: 12,
              }}>
              {userData?.displayName}
            </Text> */}
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              style={{
                textAlign: 'right',
                height: 40,
                fontSize: 12,
                borderColor: theme.lightColor.textBlack,
                fontFamily: theme.fontFamily.LabGrotesqueBold,
                // borderWidth: 1,
                // borderRadius: 8,
                // paddingHorizontal: 10,
                // marginBottom: 10,
              }}
            />
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
              {userData?.email}
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
          onPress={handleSaveName}
          // onPress={() => {
          //   navigation.goBack();
          // }}
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
            {loading ? (
              <ActivityIndicator
                size="small"
                color={theme.lightColor.textWhite}
              />
            ) : (
              <Text
                style={{
                  color: theme.lightColor.textWhite,
                  fontSize: 18,
                  fontFamily: theme.fontFamily.LabGrotesqueBold,
                }}>
                Save Changes
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
});
