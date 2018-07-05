import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import UnexchangeableItem from 'component/project/unexchangeable';
import { hasPermission } from 'component/auth/permission/lock';
import Header from './header';
import styles from './style';

@connect(({ portfolio, loading }) => ({
  data: R.pathOr(null, ['unexchangeable', 'index', 'data'])(portfolio),
  pagination: R.pathOr(null, ['unexchangeable', 'index', 'pagination'])(portfolio),
  params: R.pathOr(null, ['unexchangeable', 'params'])(portfolio),
  loading: loading.effects['portfolio/index'],
}))
export default class Unexchangeable extends Component {
  state = {
    status: R.path(['params', 'status'])(this.props),
  };

  requestData = (page, size, callback) => {
    const { status } = this.state;
    this.props.dispatch({
      type: 'portfolio/index',
      payload: {
        status,
        currentPage: page,
        pageSize: size,
      },
      callback,
    });
  };

  handleSelect = (status) => {
    this.setState({ status }, this.requestData);
  };

  handleItemPress = item => () => {
    if (!hasPermission('project-view')) {
      return;
    }
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
        params: {
          item,
        },
      })
    );
  };

  renderItem = ({ item }) => (
    <UnexchangeableItem item={item} onPress={this.handleItemPress(item)} />
  );

  renderHeader = () => <Header value={this.state.status} onSelect={this.handleSelect} />;

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <List
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          onScroll={this.props.onScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}
