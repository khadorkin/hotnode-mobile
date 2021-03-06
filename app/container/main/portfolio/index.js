import React, { Component } from 'react';
import { View, Image, Text, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';
import { NavigationActions } from 'react-navigation';

import { hasPermission } from 'component/auth/permission/lock';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import AddButton from 'component/add';

import PortfolioWrapper from './route/portfolio/wrapper';
import ProjectWrapper from './route/project/wrapper';
import styles from './style';

@global.bindTrack({
  page: '投资库',
  name: 'App_ProjectOperation',
})
@compose(withState('addButtonVisible', 'setAddButtonVisible', true))
@connect(({ global }) => ({
  constants: global.constants,
}))
export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.navigation.getParam('fromRecommendation') ? 1 : 0,
      routes: [
        { key: 'portfolio', title: '已投项目' },
        { key: 'project', title: '工作流' },
      ],
    };
  }

  handleIndexChange = index => {
    const subModuleName = () => {
      switch (index) {
        case 0:
          return '已投项目';
        case 1:
          return '工作流';
        default:
          return null;
      }
    };
    this.setState({ index }, () => {
      this.props.track('Tab切换', { subModuleName: subModuleName() });
    });
  };

  handleSearchBarPress = () => {
    this.props.track('搜索框');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Search',
      }),
    );
  };

  handleMomentumScrollBegin = () => {
    LayoutAnimation.easeInEaseOut();
    this.props.setAddButtonVisible(false);
  };

  handleMomentumScrollEnd = () => {
    LayoutAnimation.easeInEaseOut();
    this.props.setAddButtonVisible(true);
  };

  handleRightPress = () => {
    this.props.track('添加项目');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateProject',
      }),
    );
  };

  renderHeader = props => (
    <NavBar
      gradient
      renderTitle={() => (
        <TabBar
          {...props}
          style={styles.tabBar.container}
          tabStyle={styles.tabBar.tab}
          labelStyle={styles.tabBar.label}
          indicatorStyle={styles.tabBar.indicator}
        />
      )}
      renderRight={() => (
        <Touchable onPress={this.handleSearchBarPress}>
          <Icon name="search" color="white" size={24} />
        </Touchable>
      )}
    />
  );

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'portfolio':
        return (
          <PortfolioWrapper
            onMomentumScrollBegin={this.handleMomentumScrollBegin}
            onMomentumScrollEnd={this.handleMomentumScrollEnd}
          />
        );
      case 'project':
        return (
          <ProjectWrapper
            onMomentumScrollBegin={this.handleMomentumScrollBegin}
            onMomentumScrollEnd={this.handleMomentumScrollEnd}
          />
        );
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
    const { addButtonVisible } = this.props;
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
        {addButtonVisible &&
          hasPermission('project-create') && (
            <AddButton onPress={this.handleRightPress} />
          )}
      </View>
    );
  }
}
