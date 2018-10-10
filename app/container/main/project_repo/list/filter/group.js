import React, { PureComponent } from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import { compose, withState, withProps } from 'recompose';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';

@compose(
  withState('expanded', 'setExpanded', false),
  withProps(({ expanded, data }) => ({
    clipped_data: expanded ? data : R.take(9)(data),
  })),
)
export default class FilterGroup extends PureComponent {
  handleExpandPress = () => {
    LayoutAnimation.easeInEaseOut();
    this.props.setExpanded(!this.props.expanded);
  };

  render() {
    const {
      title,
      data,
      clipped_data,
      expanded,
      selection,
      onSelect,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header.container}>
          <Text style={styles.header.title} numberOfLines={1}>
            {title}
          </Text>
          {R.length(data) > 9 && (
            <Touchable borderless onPress={this.handleExpandPress}>
              <Text style={styles.header.expand}>
                {expanded ? '收起' : '展开'}{' '}
                <Icon
                  name={`md-arrow-${expanded ? 'dropup' : 'dropdown'}`}
                  override
                />
              </Text>
            </Touchable>
          )}
        </View>
        <View style={styles.tag.container}>
          {R.map(d => {
            const selected = R.contains(`${d.id}`)(selection);
            return (
              <Touchable
                key={d.id}
                style={[
                  styles.tag.item.container,
                  selected && styles.tag.item.highlight,
                ]}
                onPress={() => onSelect(d.id)}
              >
                <Text
                  style={[
                    styles.tag.item.title,
                    selected && styles.tag.item.titleHighlight,
                  ]}
                  numberOfLines={1}
                >
                  {d.name}
                </Text>
              </Touchable>
            );
          })(clipped_data)}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingRight: 12,
    },
    title: {
      flex: 1,
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    expand: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
  tag: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    item: {
      container: {
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
        marginRight: 9,
        marginBottom: 10,
        paddingHorizontal: 2,
      },
      highlight: {
        backgroundColor: '#E5F3FF',
      },
      title: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.65)',
      },
      titleHighlight: {
        color: '#1890FF',
      },
    },
  },
};
