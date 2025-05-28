import {View, Text} from 'react-native';
import React from 'react';
import LiveViewersSection from './LiveViewersSection';
import NewFollowerSection from './NewFollowerSection';
import CommentsSection from './CommentsSection';
import LikesSection from './LikesSection';

export default function AllSection() {
  return (
    <View>
      <LiveViewersSection />
      {/* <NewFollowerSection /> */}
      <CommentsSection />
      <LikesSection />
    </View>
  );
}
