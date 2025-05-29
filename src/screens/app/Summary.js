import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
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

export default function Summary({navigation}) {
  return (
    <LinearWrapper>
      <ScrollView>
        <AppHeader navigation={navigation} />
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
            marginTop: verticalScale(16),
            marginHorizontal: horizontalScale(20),
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('All')}
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
            marginTop: verticalScale(16),
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
            marginTop: verticalScale(16),
            borderRadius: moderateScale(12),
            padding: 3,
            marginHorizontal: horizontalScale(20),
          }}>
          <TouchableOpacity
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
      </ScrollView>
    </LinearWrapper>
  );
}

const styles = StyleSheet.create({
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
});
