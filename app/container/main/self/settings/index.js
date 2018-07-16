import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import ListItem from 'component/listItem';
import styles from './style';

@connect()
class Settings extends Component {
  logout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  handleLogoutPress = () => {
    Alert.alert('提示', '确认退出登录 ？', [
      { text: '确认', onPress: this.logout },
      { text: '取消', style: 'cancel' },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient back title="设置" />
        <ScrollView>
          <ListItem title="清除缓存" content="10.92M" />
          <ListItem title="检测新版本" content="v1.0" />
          <ListItem title="评价 Hotnode" />
        </ScrollView>
        <Touchable
          style={styles.bottom.container}
          onPress={this.handleLogoutPress}
        >
          <Text style={styles.bottom.title}>退出当前账号</Text>
        </Touchable>
      </View>
    );
  }
}

export default Settings;