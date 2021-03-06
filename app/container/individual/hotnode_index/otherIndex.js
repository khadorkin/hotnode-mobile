import React, { Component } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { Flex } from 'antd-mobile';
import { Col, Grid, Row } from 'react-native-easy-grid';
import R from 'ramda';

import Icon from 'component/uikit/icon';
import Format from 'component/format';
import EnhancedText from 'component/text';

class OtherIndex extends Component {
  state = {
    fadeAnim: new Animated.Value(1),
  };

  componentDidMount() {
    this.startIndexAnimation();
  }

  startIndexAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.fadeAnim, {
        toValue: 0.3,
        duration: 400,
        delay: 200,
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 800,
      }),
    ]).start();
  };

  renderPlaceholder = content => {
    return (
      <Animated.View style={{ opacity: this.state.fadeAnim }}>
        {content}
      </Animated.View>
    );
  };

  render() {
    const gbi = R.pathOr({}, ['global', 'other_index', 'gbi'])(this.props);
    const sic = R.pathOr({}, ['global', 'other_index', 'sic'])(this.props);
    const hsi = R.pathOr({}, ['global', 'other_index', 'hsi'])(this.props);
    const ixic = R.pathOr({}, ['global', 'other_index', 'ixic'])(this.props);
    const wechat = R.pathOr({}, ['global', 'other_index', 'wechat'])(this.props);
    const baidu = R.pathOr({}, ['global', 'other_index', 'baidu'])(this.props);
    return (
      <Grid style={styles.wrapper}>
        <Row>
          <Col style={styles.itemWrapper}>
            <View style={[styles.imageWrapper, { right: 3 }]}>
              <Image source={require('asset/hotnode_index/gbi_icon.png')} />
            </View>
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>{gbi.name}</Text>
                <Text style={styles.index}>{gbi.current_index}</Text>
                <Flex style={{ marginTop: 5 }}>
                  <EnhancedText style={styles.variation} colorAware digit={2}>
                    {gbi.index_variation}
                  </EnhancedText>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Icon
                      override
                      name={`md-arrow-drop${
                        gbi.index_variance_ratio < 0 ? 'down' : 'up'
                        }`}
                      color={
                        gbi.index_variance_ratio < 0 ? '#F55454' : '#09AC32'
                      }
                    />
                    <Text
                      style={[
                        styles.variation,
                        {
                          color:
                            gbi.index_variance_ratio < 0
                              ? '#F55454'
                              : '#09AC32',
                        },
                      ]}
                    >
                      {' '}
                      <Format digit={2}>
                        {Math.abs(gbi.index_variance_ratio)}
                      </Format>
                      %
                    </Text>
                  </Flex>
                </Flex>
              </View>,
            )}
          </Col>
        </Row>
        <Row>
          <Col style={styles.itemWrapper}>
            <View style={[styles.imageWrapper, { right: 3 }]}>
              <Image source={require('asset/hotnode_index/baidu.png')} />
            </View>
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>{baidu.name}</Text>
                <Text style={styles.index}>{baidu.current_index}</Text>
                <Flex style={{ marginTop: 5 }}>
                  <EnhancedText style={styles.variation} colorAware digit={2}>
                    {baidu.index_variation}
                  </EnhancedText>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Icon
                      override
                      name={`md-arrow-drop${
                        baidu.index_variance_ratio < 0 ? 'down' : 'up'
                        }`}
                      color={
                        baidu.index_variance_ratio < 0 ? '#F55454' : '#09AC32'
                      }
                    />
                    <Text
                      style={[
                        styles.variation,
                        {
                          color:
                            baidu.index_variance_ratio < 0
                              ? '#F55454'
                              : '#09AC32',
                        },
                      ]}
                    >
                      {' '}
                      <Format digit={2}>
                        {Math.abs(baidu.index_variance_ratio)}
                      </Format>
                      %
                    </Text>
                  </Flex>
                </Flex>
              </View>,
            )}
          </Col>
          <Col style={styles.itemWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                source={require('asset/hotnode_index/shangzheng_icon.png')}
              />
            </View>
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>{sic.name}</Text>
                <Text style={styles.index}>{sic.current_index}</Text>
                <Flex style={{ marginTop: 5 }}>
                  <EnhancedText style={styles.variation} colorAware digit={2}>
                    {sic.index_variation}
                  </EnhancedText>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Icon
                      override
                      name={`md-arrow-drop${
                        sic.index_variance_ratio < 0 ? 'down' : 'up'
                      }`}
                      color={
                        sic.index_variance_ratio < 0 ? '#F55454' : '#09AC32'
                      }
                    />
                    <Text
                      style={[
                        styles.variation,
                        {
                          color:
                            sic.index_variance_ratio < 0
                              ? '#F55454'
                              : '#09AC32',
                        },
                      ]}
                    >
                      {' '}
                      <Format digit={2}>
                        {Math.abs(sic.index_variance_ratio)}
                      </Format>
                      %
                    </Text>
                  </Flex>
                </Flex>
              </View>,
            )}
          </Col>
        </Row>
        <Row>
          <Col style={styles.itemWrapper}>
            <View style={[styles.imageWrapper, { right: 5 }]}>
              <Image
                source={require('asset/hotnode_index/hengsheng_icon.png')}
              />
            </View>
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>{hsi.name}</Text>
                <Text style={styles.index}>{hsi.current_index}</Text>
                <Flex style={{ marginTop: 5 }}>
                  <EnhancedText style={styles.variation} colorAware digit={2}>
                    {hsi.index_variation}
                  </EnhancedText>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Icon
                      override
                      name={`md-arrow-drop${
                        hsi.index_variance_ratio < 0 ? 'down' : 'up'
                      }`}
                      color={
                        hsi.index_variance_ratio < 0 ? '#F55454' : '#09AC32'
                      }
                    />
                    <Text
                      style={[
                        styles.variation,
                        {
                          color:
                            hsi.index_variance_ratio < 0
                              ? '#F55454'
                              : '#09AC32',
                        },
                      ]}
                    >
                      {' '}
                      <Format digit={2}>
                        {Math.abs(hsi.index_variance_ratio)}
                      </Format>
                      %
                    </Text>
                  </Flex>
                </Flex>
              </View>,
            )}
          </Col>
          <Col style={styles.itemWrapper}>
            <View style={styles.imageWrapper}>
              <Image source={require('asset/hotnode_index/nasdaq_icon.png')} />
            </View>
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>{ixic.name}</Text>
                <Text style={styles.index}>{ixic.current_index}</Text>
                <Flex style={{ marginTop: 5 }}>
                  <EnhancedText style={styles.variation} colorAware digit={2}>
                    {ixic.index_variation}
                  </EnhancedText>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Icon
                      override
                      name={`md-arrow-drop${
                        ixic.index_variance_ratio < 0 ? 'down' : 'up'
                      }`}
                      color={
                        ixic.index_variance_ratio < 0 ? '#F55454' : '#09AC32'
                      }
                    />
                    <Text
                      style={[
                        styles.variation,
                        {
                          color:
                            ixic.index_variance_ratio < 0
                              ? '#F55454'
                              : '#09AC32',
                        },
                      ]}
                    >
                      {' '}
                      <Format digit={2}>
                        {Math.abs(ixic.index_variance_ratio)}
                      </Format>
                      %
                    </Text>
                  </Flex>
                </Flex>
              </View>,
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = {
  wrapper: {
    marginVertical: 15,
    marginHorizontal: 7,
  },
  item: {
    margin: 10,
  },
  itemWrapper: {
    margin: 5,
    backgroundColor: '#F9F9F9',
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  name: { fontFamily: 'PingFangSC-Medium', fontSize: 14, color: '#6C7EA4' },
  index: {
    fontFamily: 'DIN Alternate',
    fontSize: 17,
    color: '#8495B8',
    letterSpacing: 0.2,
    marginTop: 5,
  },
  variation: { fontSize: 12, color: '#6C7EA4', letterSpacing: 0.14 },
  arrow: {
    width: 5,
    height: 3,
    marginRight: 4,
    marginTop: 5,
  },
};
OtherIndex.propTypes = {};
OtherIndex.defaultProps = {};

export default OtherIndex;
