import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Matrix';
import {theme} from '../Theme';

export default function NewFollowerSection() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(380),
    width: '100%',
    backgroundColor: theme.lightColor.bgWhite,
    borderRadius: moderateScale(14),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
});
