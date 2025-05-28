import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
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
import MaskedView from '@react-native-masked-view/masked-view';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function SubscriptionScreen({navigation}) {
  const [showAllPlans, setShowAllPlans] = useState(true);

  const planData = [
    {
      type: 'free',
      planName: 'Free',
      amount: '$0',
      monthly: '',
      description: 'Perfect for casual streamers',
      checked: [
        'Unlimited standard livestreams',
        'Basic audience engagement tools (comments, reactions)',
        'Access to community support',
      ],
      unchecked: [
        'No advanced analytics',
        'Limited to 720p streaming quality',
        'Ads may appear during streams',
      ],
      gradientColors: ['#F1EA24', '#4CBA47'],
    },
    {
      type: 'premium',
      planName: 'Premium',
      amount: '$120',
      monthly: '$12 / month',
      description: 'Stream like a pro and maximize your reach',
      checked: [
        '1080p HD streaming quality',
        'Access to advanced analytics and viewer insights',
        'Custom overlays and branding tools',
        'Ad-free streaming experience',
        'Priority support',
      ],
      unchecked: [
        '1080p HD streaming quality',
        'Access to advanced analytics and viewer insights',
        'Custom overlays and branding tools',
        'Ad-free streaming experience',
        'Priority support',
      ],
      gradientColors: ['#EB5C20', '#B3176B', '#1A1464'],
    },
  ];

  const renderCard = ({item}: {item: any}) => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH,
          paddingHorizontal: horizontalScale(20),
          // paddingRight: horizontalScale(20),
          marginTop: verticalScale(12),
        }}>
        <LinearGradient
          colors={['#F1EA24', '#4CBA47']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            borderRadius: moderateScale(8),
            padding: 2,
          }}>
          <View style={[styles.planCard, {height: verticalScale(435)}]}>
            <LinearGradient
              colors={item.gradientColors}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.badgeGradient}>
              <TouchableOpacity activeOpacity={0.8} style={styles.badgeButton}>
                <MaskedView
                  maskElement={
                    <Text style={styles.badgeText}>{item.planName}</Text>
                  }>
                  <LinearGradient
                    colors={item.gradientColors}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={[styles.badgeText, {opacity: 0}]}>
                      {item.planName}
                    </Text>
                  </LinearGradient>
                </MaskedView>
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.amountRow}>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={styles.amountText}>{item.amount}</Text>
                <Text style={styles.perMonthText}>/ year</Text>
              </View>
              {item.monthly ? (
                <Text style={styles.perMonthText}>{item.monthly}</Text>
              ) : null}
            </View>

            <Text
              style={[styles.perMonthText, {marginVertical: verticalScale(8)}]}>
              {item.description}
            </Text>

            <Text style={styles.benefitHeading}>Benefits</Text>
            {item.checked.map((point: string, idx: number) => (
              <View key={idx} style={styles.benefitRow}>
                <SvgXml xml={Xmls.checkIcon} />
                <Text style={[styles.perMonthText, {marginLeft: 6}]}>
                  {point}
                </Text>
              </View>
            ))}

            <Text style={styles.benefitHeading}>Limitations</Text>
            {item.unchecked.map((point: string, idx: number) => (
              <View key={idx} style={styles.benefitRow}>
                <SvgXml xml={Xmls.unCheckedIcon} />
                <Text style={[styles.perMonthText, {marginLeft: 6}]}>
                  {point}
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* <LinearGradient
              colors={['#F1EA24', '#4CBA47']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientBorder}>
              <View style={styles.innerCircle} />
            </LinearGradient> */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: '20%',
                height: verticalScale(24),
              }}>
              <SvgXml xml={Xmls.backArrowIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Subscription</Text>
            {/* <SvgXml xml={Xmls.settingIcon} /> */}
          </View>
          <Text style={styles.sectionLabel}>Select plan</Text>
          {/* {!showAllPlans && renderCard({item: planData[0]})} */}

          <View style={{width: '100%'}}>
            {/* {!showAllPlans ? (
              <TouchableOpacity
                onPress={() => setShowAllPlans(true)}
                style={{
                  height: verticalScale(60),
                  marginHorizontal: horizontalScale(20),
                  marginTop: verticalScale(20),
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
                    Choose Plan
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : ( */}
            <>
              {/* <View style={{marginLeft: horizontalScale(20)}}> */}
              <FlatList
                data={planData}
                renderItem={renderCard}
                keyExtractor={item => item.type}
                horizontal
                pagingEnabled
                snapToInterval={SCREEN_WIDTH}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
              />
              {/* </View> */}

              <View>
                {showAllPlans ? (
                  <TouchableOpacity
                    onPress={() => setShowAllPlans(false)}
                    style={{
                      height: verticalScale(60),
                      marginHorizontal: horizontalScale(20),
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
                        Upgrade
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <LinearGradient
                    colors={['#F1EA24', '#4CBA47']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      borderRadius: moderateScale(12),
                      marginHorizontal: horizontalScale(20),
                      marginTop: verticalScale(12),
                      padding: 2,
                    }}>
                    <TouchableOpacity
                      onPress={() => setShowAllPlans(true)}
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
                          Cancel Subscription
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </LinearGradient>
                )}
              </View>
            </>
            {/* )} */}
          </View>
        </View>
      </ScrollView>
    </LinearWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },
  container: {
    paddingTop: verticalScale(60),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
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
  sectionLabel: {
    color: theme.lightColor.textWhite,
    fontSize: 12,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    marginLeft: horizontalScale(20),
    // marginBottom: verticalScale(12),
  },
  planCard: {
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountText: {
    color: theme.lightColor.textLightBlack,
    fontSize: 30,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
  },
  perMonthText: {
    color: theme.lightColor.textLightBlack,
    fontSize: 12,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },
  benefitHeading: {
    color: theme.lightColor.textGray,
    marginTop: verticalScale(12),
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  badgeGradient: {
    borderRadius: moderateScale(30),
    padding: 2,
    alignSelf: 'flex-start',
    marginBottom: verticalScale(16),
  },
  badgeButton: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(30),
    backgroundColor: theme.lightColor.bgWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: moderateScale(14),
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    backgroundColor: 'transparent',
  },

  buttonText: {
    color: '#fff',
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    fontSize: 16,
  },
  choosePlanButton: {
    backgroundColor: '#4CBA47',
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
});
