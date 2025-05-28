import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import {theme} from '../Theme';

export default function LiveViewersSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Viewers</Text>

      {[1, 2, 3].map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.icon}>🚀</Text>
          <View style={styles.textContainer}>
            <Text style={styles.messageText}>
              You're trending!{' '}
              <Text style={styles.highlightedText}>150 live viewers</Text> are
              watching right now. Keep the energy going!
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(14),
    padding: moderateScale(12),
    marginVertical: verticalScale(6),
  },
  title: {
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    fontSize: moderateScale(16),
    // marginBottom: verticalScale(12),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    marginTop: verticalScale(12),
  },
  icon: {
    fontSize: moderateScale(22),
    marginRight: horizontalScale(10),
    marginTop: verticalScale(2),
  },
  textContainer: {
    flex: 1,
  },
  messageText: {
    color: theme.lightColor.textBlack,
    fontFamily: theme.fontFamily.LabGrotesqueRegular,
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
  },
  highlightedText: {
    fontFamily: theme.fontFamily.LabGrotesqueBold,
    color: theme.lightColor.textBlack,
  },
});
