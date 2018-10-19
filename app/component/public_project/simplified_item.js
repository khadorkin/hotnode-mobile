import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const colorMap = [
  {
    textColor: '#1890FF',
    backgroundColor: '#E5F3FF',
  },
  {
    textColor: '#FF7600',
    backgroundColor: '#FFE9D6',
  },
  {
    textColor: '#A663E0',
    backgroundColor: '#ECD7FE',
  },
  {
    textColor: '#09AC32',
    backgroundColor: '#BCF4CA',
  },
];

const simplifiedPublicProjectItem = ({ style, data, onPress }) => {
  const icon = R.pathOr('', ['icon'])(data);
  const project_name = R.pathOr('--', ['name'])(data);
  const category = R.pipe(
    R.pathOr([], ['tags']),
    R.take(2),
  )(data);
  const description = R.pathOr('--', ['description'])(data);
  const owner_status = R.pathOr('', ['owner_status'])(data);
  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <Avatar
          size={45}
          source={
            R.isEmpty(icon)
              ? require('asset/project/project_logo_default.png')
              : { uri: icon }
          }
        />
        <View style={styles.content.container}>
          <View style={styles.content.top.container}>
            <View style={styles.content.top.title.container}>
              <Text style={styles.content.top.title.text} numberOfLines={2}>
                {project_name}
              </Text>
            </View>
            <View style={styles.content.tag.wrapper}>
              {R.addIndex(R.map)((t, i) => {
                const textColor = R.pathOr('#939393', [i, 'textColor'])(
                  colorMap,
                );
                const backgroundColor = R.pathOr('#E2E2E2', [
                  i,
                  'backgroundColor',
                ])(colorMap);
                return (
                  <View
                    key={`${i}`}
                    style={[styles.content.tag.container, { backgroundColor }]}
                  >
                    <Text
                      style={[styles.content.tag.title, { color: textColor }]}
                    >
                      {R.pipe(
                        R.pathOr('', ['name']),
                        R.trim,
                      )(t)}
                    </Text>
                  </View>
                );
              })(category)}
            </View>
            <View>
              {owner_status === '0' && (
                <Text
                  style={{ fontSize: 12, fontWeight: 'bold', color: '#F88E40' }}
                >
                  待审核
                </Text>
              )}
              {owner_status === '1' && (
                <Text
                  style={{ fontSize: 12, fontWeight: 'bold', color: '#09AC32' }}
                >
                  已审核
                </Text>
              )}
              {owner_status === '2' && (
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  未通过审核
                </Text>
              )}
            </View>
          </View>
          <View style={styles.content.subtitle.container}>
            <Text numberOfLines={1} style={styles.content.subtitle.text}>
              {description}
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
        container: {},
        text: {
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
      status: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1890FF',
      },
    },
    tag: {
      wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
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
        marginTop: 9,
      },
      text: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
  },
};

simplifiedPublicProjectItem.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

simplifiedPublicProjectItem.defaultProps = {
  onPress: () => null,
};

export default simplifiedPublicProjectItem;