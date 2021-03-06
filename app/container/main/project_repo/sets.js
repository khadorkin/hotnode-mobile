import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Flex } from 'antd-mobile';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as WeChat from 'react-native-wechat';
import Config from 'runtime/index';
import shareModal from 'component/shareModal';

import List from 'component/uikit/list';
import FavorItem from 'component/favored/item';
import styles from './style';

@connectActionSheet
@connect(({ coinSets, loading }, { set_id }) => ({
  data: R.pathOr([], ['coins', set_id, 'data'])(coinSets),
  pagination: R.pathOr(null, ['coins', set_id, 'pagination'])(coinSets),
  loading: loading.effects['coinSets/fetchCoins'],
}))
@shareModal
export default class CoinsInSet extends Component {
  onPressShare = () => {
    const request = {
      webpageUrl: `${Config.MOBILE_SITE}/coin-set?id=${this.props.set_id}`,
      title: `「项目集」${this.props.tabLabel}`,
      description: '来 Hotnode, 发现最新最热项目！',
      thumbImage:
        'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/coin-set-share.jpg',
    };

    this.props.openShareModal({
      types: [
        {
          type: 'timeline',
          ...request,
        },
        {
          type: 'session',
          ...request,
        },
      ],
      onOpen: () => {
        this.props.dispatch(
          NavigationActions.setParams({
            params: { tabBarVisible: false },
            key: 'ProjectRepo',
          }),
        );
      },
      onClose: () => {
        this.props.dispatch(
          NavigationActions.setParams({
            params: { tabBarVisible: true },
            key: 'ProjectRepo',
          }),
        );
      },
    });
  };

  requestData = (page, size) => {
    const { set_id } = this.props;
    this.props.dispatch({
      type: 'coinSets/fetchCoins',
      set_id,
      params: {
        page,
        'per-page': size,
      },
    });
  };

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <FavorItem
      data={item}
      onPress={this.handleItemPress(item)}
      // afterFavor={() => this.requestData()}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderHeader = () => {
    return (
      <Flex style={styles.header} align="center" justify="between">
        <Text style={styles.headerText}>
          {this.props.tabLabel}
          为您精选{' '}
          <Text style={styles.headerHighlight}>
            {R.path(['pagination', 'total'])(this.props)}
          </Text>{' '}
          个{this.props.tabLabel === '矿机矿池' ? '优质机构' : '项目'}{' '}
        </Text>
        <Flex align="center">
          <Image
            style={{ width: 13, height: 13 }}
            source={require('asset/coin_sets/share_active.png')}
          />
          <TouchableWithoutFeedback onPress={this.onPressShare}>
            <View>
              <Text
                style={{
                  marginLeft: 7,
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.65)',
                  letterSpacing: 0.17,
                }}
              >
                分享
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Flex>
      </Flex>
    );
  };

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <List
          contentContainerStyle={styles.listContainer}
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}
