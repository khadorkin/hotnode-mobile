import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Linking } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import ChatButton from 'component/chat_button';
import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';
import { hideRealMobile } from 'utils/utils';

const memberItem = ({
  editMode = false,
  institutionOwned,
  data,
  style,
}) => {
  const profile_pic = R.pathOr('', ['avatar_url'])(data);
  const name = R.pathOr('--', ['name'])(data);
  const title = R.pathOr('--', ['title'])(data);
  const intro = R.pathOr('--', ['description'])(data);
  const linkedIn_url = R.path(['linkedin'])(data);
  const mobile = R.pathOr(false, ['has_mobile'])(data);
  const wechat = R.pathOr(false, ['has_wechat'])(data);
  const is_vip = R.pathOr(false, ['is_vip'])(data);
  const user_id = R.path(['user_id'])(data);

  return (
    <Flex style={[styles.container, style]} align="flex-start">
      <View>
        <Avatar
          size={52}
          source={{ uri: profile_pic }}
          style={styles.avatar.container}
          imageStyle={styles.avatar.image}
          raised={false}
          innerRatio={1}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content.container}>
        <Flex justify="space-between">
          <Flex>
            <Text style={styles.content.name}>{hideRealMobile(name)}</Text>
            {!!is_vip && (
              <Image
                style={{ marginLeft: 8 }}
                source={require('asset/project/detail/vip_icon.png')}
              />
            )}
            {!!linkedIn_url && (
              <Image
                style={{ marginLeft: 8 }}
                source={require('asset/project/detail/linkedin.png')}
              />
            )}
          </Flex>
        </Flex>
        <Text style={styles.content.title}>{title}</Text>
        <Flex style={{ marginTop: 6 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.content.intro} numberOfLines={2}>
              {intro}
            </Text>
          </View>
          <Flex>
            {!!mobile && !institutionOwned && (
              <Image source={require('asset/project/detail/mobile.png')} />
            )}
            {!!wechat && !institutionOwned && (
              <Image
                style={{ marginLeft: 12 }}
                source={require('asset/project/detail/wechat.png')}
              />
            )}
          </Flex>
        </Flex>
      </View>
    </Flex>
  );
};

const styles = {
  container: {
    paddingVertical: 12,
  },
  avatar: {
    container: {
      borderRadius: 0,
    },
    image: {
      borderRadius: 2,
    },
  },
  claim: {
    container: {
      width: 52,
      backgroundColor: '#1890FF',
      marginTop: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 10,
      color: 'white',
    },
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 12,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    title: {
      marginTop: 6,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
      fontWeight: 'bold',
    },
    intro: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
      lineHeight: 18,
    },
  },
  action: {
    text: {
      fontSize: 13,
      fontWeight: 'bold',
    },
  },
};

memberItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memberItem;
