import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';

import LinearWrapper from '../../components/ui/LinearWrapper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import {theme} from '../../components/Theme';
import Xmls from '../../utils/Xmls';

import LiveViewersSection from '../../components/ui/LiveViewersSection';
import NewFollowerSection from '../../components/ui/NewFollowerSection';
import CommentsSection from '../../components/ui/CommentsSection';
import LikesSection from '../../components/ui/LikesSection';
import AllSection from '../../components/ui/AllSection';

const TABS = [
  {title: 'All', component: <AllSection />},
  {title: 'Live viewers', component: <LiveViewersSection />},
  {title: 'New Followers', component: <NewFollowerSection />},
  {title: 'Comments', component: <CommentsSection />},
  {title: 'Likes', component: <LikesSection />},
];

const Notifications = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0].title);
  const [tabWidths, setTabWidths] = useState({});

  const handleLayout = (title, event) => {
    const {width} = event.nativeEvent.layout;
    setTabWidths(prev => ({...prev, [title]: width}));
  };

  const renderTab = tab => (
    <TouchableOpacity
      key={tab.title}
      onPress={() => setSelectedTab(tab.title)}
      style={styles.tabButton}>
      <View>
        <Text
          onLayout={e => handleLayout(tab.title, e)}
          style={[
            styles.tabText,
            selectedTab === tab.title && styles.selectedTabText,
          ]}>
          {tab.title}
        </Text>
        {selectedTab === tab.title && tabWidths[tab.title] && (
          <View style={[styles.underline, {width: tabWidths[tab.title]}]} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSelectedComponent = () => {
    const selected = TABS.find(tab => tab.title === selectedTab);
    return selected?.component || null;
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
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <SvgXml xml={Xmls.settingIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>{TABS.map(renderTab)}</View>

      <ScrollView contentContainerStyle={{paddingBottom: verticalScale(80)}}>
        <View style={styles.container}>
          {/* Header */}

          {/* Tabs */}
          {/* <View style={styles.tabContainer}>{TABS.map(renderTab)}</View> */}

          {/* Selected Tab Content */}
          <View style={styles.contentContainer}>
            {renderSelectedComponent()}
          </View>
        </View>
      </ScrollView>
    </LinearWrapper>
  );
};

export default Notifications;

const CIRCLE_SIZE = horizontalScale(48);

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(42),
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.lightColor.bgWhite,
    width: CIRCLE_SIZE - moderateScale(4),
    height: CIRCLE_SIZE - moderateScale(4),
    borderRadius: (CIRCLE_SIZE - moderateScale(4)) / 2,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    color: '#F4CDCF',
    fontSize: 14,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
  },
  selectedTabText: {
    color: '#fff',
    fontFamily: theme.fontFamily.LabGrotesqueBold,
  },
  underline: {
    height: 2,
    backgroundColor: '#fff',
    marginTop: 4,
    alignSelf: 'center',
    borderRadius: 1,
  },
  contentContainer: {
    paddingHorizontal: horizontalScale(20),
  },
});
