import React from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Swiper from '@nart/react-native-swiper';
import R from 'ramda';

import Badge from 'component/badge';
import Touchable from 'component/uikit/touchable';

const deviceWidth = Dimensions.get('window').width;

const top = ({
  insite_news,
  onServicePress,
  onMeetingPress,
  onAnnouncementPress,
  onProjectRepoPress,
  onInstitutionPress,
  onInstitutionReportPress,
  notification_badge_visible,
}) => (
  <View style={styles.container}>
    <Image
      style={styles.banner}
      source={require('asset/public_project/banner.png')}
    />
    <View style={styles.verticalBanner.container}>
      <Image source={require('asset/public_project/announcement_label.png')} />
      <Swiper
        style={styles.verticalBanner.bannerWrapper}
        height={styles.verticalBanner.container.height}
        horizontal={false}
        showsPagination={false}
        autoplay
      >
        {R.map(n => (
          <View key={n.id} style={styles.verticalBanner.group.container}>
            <Text style={styles.verticalBanner.group.title} numberOfLines={1}>
              {R.pathOr('--', ['title'])(n)}
            </Text>
          </View>
        ))(insite_news)}
      </Swiper>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tab.container}
    >
      <Touchable style={styles.tab.group.wrapper} onPress={onProjectRepoPress}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/project_hunt.png')} />
          </View>
          <Text style={styles.tab.group.title}>找项目</Text>
        </View>
      </Touchable>
      <Touchable
        style={styles.tab.group.wrapper}
        onPress={onInstitutionReportPress}
      >
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/report.png')} />
          </View>
          <Text style={styles.tab.group.title}>研报</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onInstitutionPress}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/institution.png')} />
          </View>
          <Text style={styles.tab.group.title}>找机构</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onMeetingPress}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/meeting.png')} />
          </View>
          <Text style={styles.tab.group.title}>找会议</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onAnnouncementPress}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/announcement.png')} />
          </View>
          <Text style={styles.tab.group.title}>上所公告</Text>
          {notification_badge_visible && <Badge size={8} />}
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onServicePress}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image
              source={require('asset/public_project/pr.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <Text style={styles.tab.group.title}>公关服务</Text>
        </View>
      </Touchable>
    </ScrollView>
  </View>
);

const styles = {
  container: {},
  banner: {
    // height: 160,
    width: deviceWidth,
  },
  verticalBanner: {
    container: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 12,
      marginRight: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    bannerWrapper: {
      marginLeft: 12,
    },
    group: {
      container: {
        flex: 1,
        justifyContent: 'center',
      },
      title: {
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: 12,
      },
    },
  },
  tab: {
    container: {
      height: 82,
      flexDirection: 'row',
    },
    group: {
      wrapper: {
        width: 82,
      },
      imageWrapper: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.85)',
        marginTop: 8,
      },
    },
  },
};

export default top;
