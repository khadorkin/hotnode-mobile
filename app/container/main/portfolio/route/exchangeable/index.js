import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import Loading from 'component/uikit/loading';
import List from 'component/uikit/list';
import ProjectItem from 'component/project/item';
import PriceChangeItem from 'component/project/priceChangeItem';
import InvestmentItem from 'component/project/investmentItem';
import Header from './header';
import styles from './style';

@connect(({ portfolio, loading }) => ({
  data: R.pathOr(null, ['exchangeable', 'index', 'data'])(portfolio),
  pagination: R.pathOr(null, ['exchangeable', 'index', 'pagination'])(
    portfolio,
  ),
  params: R.pathOr(null, ['exchangeable', 'params'])(portfolio),
  loading: loading.effects['portfolio/investment'],
}))
export default class Exchangeable extends Component {
  state = {
    rank: R.path(['params', 'rank'])(this.props),
    switching: false,
  };

  requestData = (page, size, callback) => {
    const { rank } = this.state;
    this.props.dispatch({
      type: 'portfolio/investment',
      payload: {
        rank,
        currentPage: page,
        pageSize: size,
      },
      callback,
    });
  };

  handleSelect = rank => {
    if (R.equals(rank, this.state.rank)) return;
    this.setState({ switching: true, rank }, () =>
      this.requestData(undefined, undefined, () => {
        this.setState({ switching: false });
      }),
    );
  };

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
        params: {
          item,
        },
      }),
    );
  };

  renderItem = ({ item, index }) => {
    switch (this.state.rank) {
      case 'profits':
      case 'roi':
        return (
          <ProjectItem
            item={item}
            index={index}
            onPress={this.handleItemPress(item)}
          />
        );
      case 'increase':
        return (
          <PriceChangeItem
            item={item}
            index={index}
            onPress={this.handleItemPress(item)}
          />
        );
      case 'cost':
        return (
          <InvestmentItem
            item={item}
            index={index}
            onPress={this.handleItemPress(item)}
          />
        );
      default:
        return null;
    }
  };

  renderHeader = () => (
    <Header value={this.state.rank} onSelect={this.handleSelect} />
  );

  render() {
    const { data, pagination, loading } = this.props;
    const { switching } = this.state;
    return (
      <View style={styles.container}>
        {switching ? (
          <Loading />
        ) : (
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
        )}
      </View>
    );
  }
}
