import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import ListItem from 'component/listItem';

import { realm, getKeychain, deleteKeychain } from '../../../../utils/keychain';
import styles from './style';

@connectActionSheet
@connect()
class KeyManagement extends Component {
  state = {
    data: null,
  };

  componentWillMount() {
    this.requestKeychain();
    realm.addListener('change', this.handleKeychainChange);
  }

  componentWillUnmount() {
    realm.removeListener('change', this.handleKeychainChange);
  }

  requestKeychain = () => {
    const data = getKeychain();
    if (data) {
      this.setState({ data });
    }
  };

  removeKeychain = item => {
    deleteKeychain(item);
  };

  handleKeychainChange = () => {
    this.requestKeychain();
  };

  handleResetPress = item => {
    switch (item.type) {
      case 'eth':
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'AddWallet',
            params: {
              item,
            },
          }),
        );
        break;
      case 'exchange':
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'AddExchange',
            params: {
              title: item.name,
              item,
            },
          }),
        );
        break;
      default:
        break;
    }
  };

  handleItemPress = item => () => {
    this.props.showActionSheetWithOptions(
      {
        options: ['查看 API Key', '重置', '删除', '取消'],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 2,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            this.handleResetPress(item);
            break;
          case 2:
            this.removeKeychain(item);
            break;
          default:
            break;
        }
      },
    );
  };

  renderNavBarRight = () => (
    <View style={styles.navBar.right.container}>
      <Touchable borderless>
        <Text style={styles.navBar.right.text}>更新</Text>
      </Touchable>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header.container}>
      <Image source={require('asset/management/light_bulb.png')} />
      <View style={styles.header.title.container}>
        <Text style={styles.header.title.text}>
          我们在打开 APP 期间每5分钟同步一次 API Key
        </Text>
      </View>
    </View>
  );

  renderItem = (item, index) => {
    const optIcon = name => {
      switch (name) {
        case 'Huobi Global':
          return require('asset/management/exchange/huobi.png');
        case 'Binance':
          return require('asset/management/exchange/binance.png');
        case 'Gate.io':
          return require('asset/management/exchange/gate.png');
        case 'OKEx':
          return require('asset/management/exchange/okex.png');
        default:
          return require('asset/management/exchange/ETH.png');
      }
    };
    return (
      <ListItem
        key={index}
        style={styles.item.container}
        icon={optIcon(item.name)}
        title={`${item.name}（创建于${item.created}）`}
        titleStyle={styles.item.title}
        subtitle={item.lastSync || '暂未同步'}
        onPress={this.handleItemPress(item)}
      />
    );
  };

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title="Key 管家"
          renderRight={this.renderNavBarRight}
        />
        <ScrollView>
          {this.renderHeader()}
          {!!data && data.map(this.renderItem)}
        </ScrollView>
      </View>
    );
  }
}

export default KeyManagement;
