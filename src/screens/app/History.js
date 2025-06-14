import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import LinearWrapper from '../../components/ui/LinearWrapper';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import {theme} from '../../components/Theme';
import {LineChart, CurveType} from 'react-native-gifted-charts';
import MaskedView from '@react-native-masked-view/masked-view';

const screenWidth = Dimensions.get('window').width;

export default function History({navigation}) {
  const data = [
    {value: 0, label: '4:00'},
    {value: 3, label: '5:00'},
    {value: 10, label: '6:00'},
    {value: 25, label: '7:00'},
    {value: 20, label: '8:00'},
    {value: 30, label: '9:00'},
    {value: 23, label: '10:00'},
    {value: 25, label: '11:00'},
  ];
  const [selectedOption, setSelectedOption] = useState('Hourly');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const liveStreamData = [0, 1, 2];
  const options = ['Yearly', 'Monthly', 'Daily', 'Hourly'];

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
        <Text style={styles.title}>Stream History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <SvgXml xml={Xmls.settingIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {/* Header */}

          <View style={styles.graphContainer}>
            <View style={styles.plateformConatiner}>
              <View
                style={{
                  width: horizontalScale(120),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: verticalScale(6),
                  }}>
                  <Text
                    style={{
                      color: '#878381',
                      fontSize: 12,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    }}>
                    04 Jan 2024
                  </Text>
                  <SvgXml xml={Xmls.dropdownIconBlack} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#D6D6D6',
                        height: verticalScale(23),
                        width: horizontalScale(23),
                        borderRadius: moderateScale(23),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: verticalScale(21),
                          width: horizontalScale(21),
                          borderRadius: moderateScale(21),
                        }}>
                        <SvgXml
                          xml={Xmls.instagramIcon}
                          height={11}
                          width={11}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#D6D6D6',
                        height: verticalScale(23),
                        width: horizontalScale(23),
                        borderRadius: moderateScale(23),
                        marginLeft: horizontalScale(-6),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: verticalScale(21),
                          width: horizontalScale(21),
                          borderRadius: moderateScale(21),
                        }}>
                        <SvgXml xml={Xmls.youtubeIcon} height={11} width={11} />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#D6D6D6',
                        height: verticalScale(23),
                        width: horizontalScale(23),
                        borderRadius: moderateScale(23),
                        marginLeft: horizontalScale(-6),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: verticalScale(21),
                          width: horizontalScale(21),
                          borderRadius: moderateScale(21),
                        }}>
                        <SvgXml xml={Xmls.tiktokIcon} height={11} width={11} />
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: '#AEAEAE',
                      fontSize: 12,
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    }}>
                    Platforms
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: 1,
                  height: verticalScale(28),
                  backgroundColor: '#D6D6D6',
                }}
              />
              <View
                style={{
                  width: horizontalScale(120),
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    color: '#878381',
                    fontSize: 12,
                    fontFamily: theme.fontFamily.LabGrotesqueRegular,
                  }}>
                  Total Viewers
                </Text>
                <Text
                  style={{
                    color: '#373433',
                    fontSize: 18,
                    fontFamily: theme.fontFamily.LabGrotesqueRegular,
                  }}>
                  10,000
                </Text>
              </View>
            </View>
            <View style={{marginLeft: verticalScale(-40)}}>
              <LineChart
                data={data}
                // width={screenWidth - horizontalScale(40)}
                height={92}
                curved
                curveType={CurveType.QUADRATIC}
                hideDataPoints
                showXAxisIndices={false}
                showYAxisIndices={false}
                yAxisTextStyle={{display: 'none'}}
                xAxisColor="transparent"
                yAxisColor="transparent"
                rulesColor="transparent"
                // adjustToWidth={true}
                color="#DB2777"
                labelTextStyle={{
                  color: '#888',
                  fontSize: 10,
                  fontFamily: theme.fontFamily.LabGrotesqueRegular,
                }}
                xAxisLabelTexts={[
                  '5:00',
                  '6:00',
                  '7:00',
                  '8:00',
                  '9:00',
                  '10:00',
                ]}
              />
            </View>
            <View
              style={{
                marginTop: verticalScale(8),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {options.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedOption(option)}
                  style={{
                    flex: 1,
                    backgroundColor:
                      selectedOption === option ? '#D82D7E' : '#FCFCFF',
                    paddingVertical: verticalScale(10),
                    paddingHorizontal: horizontalScale(10),
                    borderColor: '#EFEFEF',
                    borderWidth: selectedOption === option ? 1 : 1,
                    borderRadius: 10,
                    marginRight:
                      index !== options.length - 1 ? horizontalScale(4) : 0,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color:
                        selectedOption === option
                          ? theme.lightColor.textWhite
                          : '#878381',
                      fontFamily: theme.fontFamily.LabGrotesqueRegular,
                    }}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: verticalScale(12),
            marginHorizontal: horizontalScale(32),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: theme.lightColor.textWhite,
                fontFamily: theme.fontFamily.LabGrotesqueBold,
              }}>
              10k
            </Text>
            <Text
              style={{
                color: '#DA91B8',
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                // marginTop: verticalScale(-4),
              }}>
              Likes
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: theme.lightColor.textWhite,
                fontFamily: theme.fontFamily.LabGrotesqueBold,
              }}>
              30k
            </Text>
            <Text
              style={{
                color: '#DA91B8',
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                // marginTop: verticalScale(-4),
              }}>
              Reactions
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: theme.lightColor.textWhite,
                fontFamily: theme.fontFamily.LabGrotesqueBold,
              }}>
              20k
            </Text>
            <Text
              style={{
                color: '#DA91B8',
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                // marginTop: verticalScale(-4),
              }}>
              Comments
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: theme.lightColor.textWhite,
                fontFamily: theme.fontFamily.LabGrotesqueBold,
              }}>
              10k
            </Text>
            <Text
              style={{
                color: '#DA91B8',
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                // marginTop: verticalScale(-4),
              }}>
              Total
            </Text>
            <Text
              style={{
                color: '#DA91B8',
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                // marginTop: verticalScale(-4),
              }}>
              Engagement
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: theme.lightColor.textWhite,
            fontFamily: theme.fontFamily.LabGrotesqueRegular,
            marginHorizontal: horizontalScale(20),
          }}>
          Top performing platform
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: horizontalScale(20),
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

        <View style={styles.pastLivestreamContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: theme.lightColor.textWhite,
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                marginBottom: verticalScale(12),
              }}>
              Past Livestreams
            </Text>
            <Text
              style={{
                color: theme.lightColor.textWhite,
                fontFamily: theme.fontFamily.LabGrotesqueRegular,
                marginBottom: verticalScale(12),
              }}>
              Sort by date
            </Text>
          </View>
          {liveStreamData.map((item, index) => {
            const isSelected = selectedIndex === index;
            const Wrapper = isSelected ? LinearGradient : View;
            const ArrowWrapper = isSelected ? LinearGradient : View;

            return (
              <Pressable
                key={index}
                onPress={() => setSelectedIndex(index)}
                activeOpacity={0.9}>
                <Wrapper
                  {...(isSelected && {
                    colors: ['#F1EA24', '#4CBA47'],
                    start: {x: 0, y: 0},
                    end: {x: 1, y: 0},
                  })}
                  style={[
                    styles.buttonWrapper,
                    {
                      marginBottom: verticalScale(12),
                      borderRadius: 12,
                    },
                  ]}>
                  <View style={styles.innerViewPastStream}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={styles.pastSocialViewContainer}>
                          <SvgXml
                            xml={Xmls.instagramIcon}
                            height={16}
                            width={16}
                          />
                        </View>
                        <View
                          style={[
                            styles.pastSocialViewContainer,
                            {marginLeft: horizontalScale(-6)},
                          ]}>
                          <SvgXml
                            xml={Xmls.youtubeIcon}
                            height={16}
                            width={16}
                          />
                        </View>
                        <View
                          style={[
                            styles.pastSocialViewContainer,
                            {
                              marginLeft: horizontalScale(-6),
                            },
                          ]}>
                          <SvgXml
                            xml={Xmls.tiktokIcon}
                            height={16}
                            width={16}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: horizontalScale(90),
                          marginTop: verticalScale(4),
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: theme.fontFamily.LabGrotesqueRegular,
                              color: theme.lightColor.textGray,
                            }}>
                            75k
                          </Text>
                          <SvgXml
                            xml={Xmls.likeIconGray}
                            height={12}
                            width={12}
                            style={{
                              marginTop: verticalScale(2),
                              marginHorizontal: horizontalScale(3),
                            }}
                          />
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: theme.fontFamily.LabGrotesqueRegular,
                              color: theme.lightColor.textGray,
                            }}>
                            120k
                          </Text>
                          <SvgXml
                            xml={Xmls.viewIconGray}
                            height={12}
                            width={12}
                            style={{
                              marginTop: verticalScale(2),
                              marginHorizontal: horizontalScale(3),
                            }}
                          />
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text
                        style={{
                          color: isSelected
                            ? theme.lightColor.testYellow
                            : theme.lightColor.textWhite,
                          fontFamily: theme.fontFamily.LabGrotesqueBold,
                        }}>
                        January 4, 2024
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SvgXml
                          xml={Xmls.timierIconGray}
                          style={{marginRight: verticalScale(4)}}
                        />
                        <Text style={{color: theme.lightColor.textGray}}>
                          5:00:30
                        </Text>
                      </View>
                    </View>

                    <ArrowWrapper
                      {...(isSelected && {
                        colors: ['#F1EA24', '#4CBA47'],
                        start: {x: 0, y: 0},
                        end: {x: 1, y: 0},
                      })}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: moderateScale(25),
                        height: CIRCLE_SIZE - moderateScale(4),
                        width: CIRCLE_SIZE - moderateScale(4),
                      }}>
                      <SvgXml
                        xml={
                          isSelected ? Xmls.arrowIcon : Xmls.arrowIconGradiant
                        }
                        height={24}
                        width={24}
                      />
                    </ArrowWrapper>
                  </View>
                </Wrapper>
              </Pressable>
            );
          })}
          <TouchableOpacity
            // onPress={() => setUserData(true)}
            style={{
              marginTop: verticalScale(20),
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
              <Text
                style={{
                  color: theme.lightColor.textWhite,
                  fontSize: 18,
                  fontFamily: theme.fontFamily.LabGrotesqueBold,
                }}>
                Export Analytics
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <LinearGradient
            colors={['#F1EA24', '#4CBA47']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              styles.buttonWrapper,
              {
                marginVertical: verticalScale(12),
              },
            ]}>
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonInner}>
              <View style={styles.buttonGradient}>
                <MaskedView
                  maskElement={
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          styles.maskText,
                          {
                            // fontFamily: theme.fontFamily.LabGrotesqueBold,
                          },
                        ]}>
                        Delete Stream History
                      </Text>
                    </View>
                  }>
                  <LinearGradient
                    colors={['#F1EA24', '#4CBA47']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={[styles.maskText, {opacity: 0}]}>
                      Delete Stream History
                    </Text>
                  </LinearGradient>
                </MaskedView>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearWrapper>
  );
}

const CIRCLE_SIZE = horizontalScale(48);

const styles = StyleSheet.create({
  container: {
    // paddingTop: verticalScale(60),
    marginHorizontal: horizontalScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(42),
    marginHorizontal: horizontalScale(20),
    marginBottom: verticalScale(12),
  },
  title: {
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  graphContainer: {
    width: '100%',
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(14),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  plateformConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    height: verticalScale(61),
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(6),
  },

  socialViewContainer: {
    width: horizontalScale(100),
    height: verticalScale(100),
    backgroundColor: '#DA91B8',
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    // textAlign: 'center',
  },
  pastLivestreamContainer: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    backgroundColor: '#171717',
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
    marginTop: verticalScale(12),
    paddingBottom: verticalScale(80),
  },

  buttonWrapper: {
    // height: verticalScale(71),
    width: '100%',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(2),
    paddingHorizontal: horizontalScale(2),
    // marginVertical: verticalScale(6),
  },
  innerViewPastStream: {
    backgroundColor: '#454545',
    // height: verticalScale(69),
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pastSocialViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(30),
    height: verticalScale(30),
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(30),
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
    borderRadius: moderateScale(12),
    backgroundColor: theme.lightColor.textBlack,
  },
  maskText: {
    fontSize: 18,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});
