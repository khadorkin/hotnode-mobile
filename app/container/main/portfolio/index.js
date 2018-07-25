import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';
import { NavigationActions } from 'react-navigation';

import { hasPermission } from 'component/auth/permission/lock';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import { setStatusBar } from 'component/uikit/statusBar';
import SearchBarDisplay from 'component/searchBar/display';
import Exchangeable from './route/exchangeable';
import Unexchangeable from './route/unexchangeable';
import { getCurrentScreen } from '../../../router';
import styles, { deviceWidth, indicatorWidth } from './style';

@compose(withState('offsetY', 'setOffsetY', 0))
@connect(({ global, router }) => ({
  constants: global.constants,
  isCurrent: getCurrentScreen(router) === 'Portfolio',
}))
export default class Portfolio extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'exchangeable', title: '已投项目' },
      { key: 'unexchangeable', title: '未投项目' },
    ],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCurrent) {
      setStatusBar('light-content');
    }
  }

  handleIndexChange = index => this.setState({ index });

  handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
    this.props.setOffsetY(contentOffset.y);
  };

  handleSearchBarPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Search',
      }),
    );
  };

  renderBarRight = () => (
    <Touchable>
      <Text style={styles.navBar.right}>添加</Text>
    </Touchable>
  );

  renderHeader = props => {
    const { offsetY } = this.props;
    return (
      <NavBar
        hidden={offsetY > 0}
        gradient
        renderTitle={() => (
          <View style={styles.searchBar.container}>
            <SearchBarDisplay onPress={this.handleSearchBarPress} />
          </View>
        )}
        renderBottom={() => (
          <TabBar
            {...props}
            style={styles.tabBar.container}
            labelStyle={styles.tabBar.label}
            indicatorStyle={[
              styles.tabBar.indicator,
              {
                left:
                  (deviceWidth / this.state.routes.length - indicatorWidth) / 2,
              },
            ]}
          />
        )}
        renderRight={this.renderBarRight}
      />
    );
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'exchangeable':
        return <Exchangeable onScroll={this.handleOnScroll} />;
      case 'unexchangeable':
        return <Unexchangeable onScroll={this.handleOnScroll} />;
      default:
        return null;
    }
  };

  render() {
    if (!hasPermission('project-list')) {
      return (
        <View
          style={[
            styles.container,
            {
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <Image
            style={{
              width: 156,
              height: 103,
              resizeMode: 'contain',
            }}
            source={require('../../../asset/permission_lock.png')}
          />
          <Text
            style={{
              color: 'rgba(0, 0, 0, .45)',
              marginTop: 30,
            }}
          >
            您尚未开通查看项目列表权限
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TabView
          initialLayout={styles.initialLayout}
          navigationState={{
            index: this.state.index,
            routes: this.state.routes,
          }}
          renderScene={this.renderScene}
          tabBarPosition="top"
          renderTabBar={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}
