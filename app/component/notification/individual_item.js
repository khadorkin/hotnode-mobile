import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const notificationItem = ({ data, onPress }) => {
  if (R.isEmpty(data) || R.isNil(data)) {
    return null;
  }

  const logo_url = R.pathOr('', ['logo_url'])(data);
  const title = R.pathOr('--', ['title'])(data);
  const project_name = R.pathOr('--', ['project_name'])(data);
  const type = R.pathOr('--', ['type'])(data);
  const subtitle = R.pathOr('--', ['subtitle'])(data);
  const push_at = R.pathOr('--', ['push_at'])(data);

  return (
    <Touchable foreground onPress={onPress(data.id)}>
      <View style={styles.container}>
        <Avatar
          size={50}
          source={
            R.isEmpty(logo_url)
              ? require('asset/project/project_logo_default.png')
              : { uri: logo_url }
          }
        />
        <View style={styles.content.container}>
          <View style={styles.content.top.container}>
            <View style={styles.content.top.title.container}>
              <Text style={styles.content.top.title.text} numberOfLines={2}>
                {title}
              </Text>
            </View>
            <Text style={styles.content.top.date}>
              {moment.unix(push_at).format('MM-DD HH:ss')}
            </Text>
          </View>
          <View style={styles.content.tag.wrapper}>
            <View
              style={[
                styles.content.tag.container,
                { backgroundColor: '#E5F3FF' },
              ]}
            >
              <Text style={[styles.content.tag.title, { color: '#1890FF' }]}>
                {project_name}
              </Text>
            </View>
            <View
              style={[
                styles.content.tag.container,
                { backgroundColor: '#FFE9D6' },
              ]}
            >
              <Text style={[styles.content.tag.title, { color: '#FF7600' }]}>
                {type}
              </Text>
            </View>
          </View>
          <View style={styles.content.subtitle.container}>
            <Text numberOfLines={2} style={styles.content.subtitle.text}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    padding: 12,
    flexDirection: 'row',
  },
  content: {
    container: {
      marginLeft: 15,
      flex: 1,
    },
    top: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        container: {
          flex: 1,
        },
        text: {
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 'bold',
          fontSize: 14,
        },
      },
      date: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
    tag: {
      wrapper: {
        marginTop: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      container: {
        height: 19,
        paddingHorizontal: 3,
        borderRadius: 2,
        marginRight: 8,
        justifyContent: 'center',
      },
      title: {
        fontSize: 11,
      },
    },
    subtitle: {
      container: {
        marginTop: 10,
      },
      text: {
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
  },
};

notificationItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

notificationItem.defaultProps = {
  onPress: () => null,
};

export default notificationItem;