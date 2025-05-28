import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function LinearWrapper({children}) {
  return (
    <LinearGradient
      colors={['#F47C52', '#B01B74', '#1A1464']}
      style={styles.gradient}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
