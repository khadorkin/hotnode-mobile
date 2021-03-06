import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Linking,
  Keyboard,
  Platform,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { compose, withState, withProps, withStateHandlers } from 'recompose';
import { Flex } from 'antd-mobile';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import moment from 'moment';
import JPush from 'jpush-react-native';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Chat from 'component/chat';
import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';
import SafeArea from 'component/uikit/safeArea';
import ActionAlert from 'component/action_alert';
import NameInputAlert from 'component/name_input_alert';
import { formatMessage } from 'utils/nim';
import { RouterEmitter, getCurrentScreen } from '../../../../router';
import styles from './style';

import { hideRealMobile } from '../../../../utils/utils';

@global.bindTrack({
  page: '聊天页',
  name: 'App_IMPageOperation',
})
@connect(
  ({ user, global, message_center, router, loading }, { navigation }) => {
    const id = navigation.getParam('id');
    return {
      id,
      user: R.path(['currentUser'])(user),
      industry_type: R.path(['constants', 'industry_type'])(global),
      target: R.path(['chat_user', id])(message_center),
      loading: loading.effects['message_center/getUserById'],
      connected: message_center.connected,
      isCurrent: getCurrentScreen(router) === 'IMPage',
    };
  },
)
@compose(
  withState('data', 'setData', []),
  withState('inLastPage', 'setInLastPage', false),
  withState('nameInputVisible', 'setNameInputVisible', false),
  withStateHandlers(
    () => ({
      showContactModal: false,
    }),
    {
      toggleContactModal: () => flag => {
        LayoutAnimation.easeInEaseOut();
        return {
          showContactModal: flag,
        };
      },
    },
  ),
  withState('showNotificationModal', 'setShowNotificationModal', false),
  withProps(({ user, target, industry_type }) => {
    const target_misc = R.pathOr(R.path(['org_info', 0])(target), [
      'coin_info',
      0,
    ])(target);
    const is_org = R.pipe(
      R.path(['type']),
      R.isNil,
      R.not,
    )(target_misc);
    return {
      user_im_id: R.path(['im_info', 'im_id'])(user),
      target_im_id: R.path(['im_info', 'im_id'])(target),
      is_org,
      target_misc: {
        ...target_misc,
        type_name: is_org
          ? R.pipe(
              R.find(t => t.value === target_misc.type),
              R.path(['name']),
            )(industry_type)
          : '项目',
      },
    };
  }),
)
class IMPage extends PureComponent {
  componentWillMount() {
    this.handleOnMessage();
    if (this.props.connected) {
      this.loadTargetInfo();
    }
    this.checkPushPermission();
    Keyboard.addListener('keyboardWillShow', e => {
      this.props.toggleContactModal(false);
    });
    Keyboard.addListener('keyboardDidShow', e => {
      this.props.toggleContactModal(false);
    });

    this.checkUserName();
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.connected && nextProps.connected) {
      this.loadTargetInfo();
    }
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  checkUserName = () => {
    const { user, setNameInputVisible } = this.props;
    if (
      R.pipe(
        R.path(['realname']),
        R.test(/用户/),
      )(user)
    ) {
      setNameInputVisible(true);
    }
  };

  loadTargetInfo = () => {
    if (this.props.target) {
      this.loadHistory();
      return;
    }
    this.props.dispatch({
      type: 'message_center/getUserById',
      id: this.props.id,
      callback: () => {
        this.loadHistory();
      },
    });
  };

  loadHistory = () => {
    const { target_im_id } = this.props;
    global.nim.resetSessionUnread(`p2p-${target_im_id}`);
    global.nim.getLocalMsgs({
      // scene: 'p2p',
      // to: target_im_id,
      sessionId: `p2p-${target_im_id}`,
      desc: true,
      limit: 50,
      done: (error, res) => {
        if (!error) {
          const { user, target } = this.props;
          const msgs = R.pathOr([], ['msgs'])(res);
          if (!R.isEmpty(msgs)) {
            this.props.setData(
              R.map(m => {
                const is_target = R.path(['from'])(m) === target_im_id;
                return formatMessage(m, {
                  name: R.path(['realname'])(is_target ? target : user),
                  avatar: R.path(['avatar_url'])(is_target ? target : user),
                });
              })(msgs),
            );
          }
        } else {
          console.log('get history error', error);
        }
      },
    });
  };

  loadEarlierHistory = () => {
    const { target_im_id, data } = this.props;
    const last_time = R.pipe(
      R.last,
      R.path(['createdAt']),
    )(data);

    global.nim.getLocalMsgs({
      // scene: 'p2p',
      // to: target_im_id,
      sessionId: `p2p-${target_im_id}`,
      desc: true,
      end: moment(last_time).valueOf(),
      limit: 50,
      done: (error, res) => {
        if (!error) {
          const { user, target } = this.props;
          const msgs = R.pathOr([], ['msgs'])(res);
          if (!R.isEmpty(msgs)) {
            this.props.setData(
              R.concat(
                data,
                R.map(m => {
                  const is_target = R.path(['from'])(m) === target_im_id;
                  return formatMessage(m, {
                    name: R.path(['realname'])(is_target ? target : user),
                    avatar: R.path(['avatar_url'])(is_target ? target : user),
                  });
                })(msgs),
              ),
            );
          } else {
            this.props.setInLastPage(true);
          }
        }
      },
    });
  };

  sendMsg = text => {
    const { target_im_id } = this.props;
    global.nim.sendText({
      scene: 'p2p',
      to: target_im_id,
      text,
      done: (error, res) => {
        const { data, user } = this.props;
        if (!error) {
          this.props.setData(
            R.concat([
              formatMessage(res, {
                name: R.path(['realname'])(user),
                avatar: R.path(['avatar_url'])(user),
              }),
            ])(data),
          );
        }
      },
    });
  };

  isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToTop = 120;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  }

  handleOnMessage = () => {
    this.subscription = RouterEmitter.addListener('onmsg', msg => {
      const { data, target, target_im_id, isCurrent } = this.props;
      if (msg.from !== target_im_id) {
        return;
      }
      if (isCurrent) {
        global.nim.resetSessionUnread(`p2p-${target_im_id}`);
      }
      this.props.setData(
        R.concat([
          formatMessage(msg, {
            name: R.path(['realname'])(target),
            avatar: R.path(['avatar_url'])(target),
          }),
        ])(data),
      );
    });
  };

  handleSend = ([message]) => {
    const { text } = message;
    this.sendMsg(text);
  };

  handleSendWechatPress = () => {
    const wechat = R.path(['profile', 'wechat'])(this.props.user);
    if (wechat) {
      this.sendMsg(`您好，这是我的微信号 ${wechat}`);
      this.props.toggleContactModal(false);
      return;
    }
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'EditProfile',
        params: {
          key: 'wechat',
          title: '微信',
        },
      }),
    );
    this.props.toggleContactModal(false);
  };

  handleMiscPress = () => {
    const { is_org, target_misc } = this.props;
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: is_org ? 'InstitutionDetail' : 'PublicProjectDetail',
        params: {
          id: target_misc.id,
        },
      }),
    );
  };

  checkPushPermission = () => {
    if (Platform.OS === 'ios') {
      JPush.hasPermission(res => {
        if (res) {
          return;
        }
        this.props.setShowNotificationModal(true);
      });
    }
  };

  renderNavBar = () => (
    <NavBar
      barStyle="dark-content"
      back
      wrapperStyle={styles.navBar.wrapper}
      renderTitle={() => {
        if (this.props.loading || !this.props.connected) {
          return <ActivityIndicator color="rgba(0, 0, 0, 0.85)" />;
        }

        const { target } = this.props;
        const realname = R.path(['realname'])(target);
        const company = R.path(['company'])(target);
        const title = R.path(['title'])(target);
        return (
          <View style={styles.navBar.title.container}>
            <Text style={styles.navBar.title.text} numberOfLines={1}>
              {hideRealMobile(realname || '')}
            </Text>
            {(!!company || !!title) && (
              <Text style={styles.navBar.title.subtext} numberOfLines={1}>
                {company || ''} {`${!!company && !!title ? '|' : ''}`}{' '}
                {title || ''}
              </Text>
            )}
          </View>
        );
      }}
      renderBottom={() => {
        const { target_misc } = this.props;
        const name = R.pathOr('--', ['name'])(target_misc);
        const type_name = R.pathOr('--', ['type_name'])(target_misc);
        const logo_url = R.pathOr('--', ['logo_url'])(target_misc);
        return (
          <View>
            {target_misc && (
              <Touchable onPress={this.handleMiscPress}>
                <Flex style={styles.navBar.misc.container}>
                  <Flex style={{ flex: 1 }}>
                    <Avatar
                      raised={false}
                      size={32}
                      source={{ uri: logo_url }}
                      style={{ borderRadius: 0, backgroundColor: '#F5F5F5' }}
                      imageStyle={{ borderRadius: 0 }}
                      innerRatio={0.8}
                    />
                    <Text style={styles.navBar.misc.title}>{name}</Text>
                    <View style={styles.navBar.misc.box.container}>
                      <Text style={styles.navBar.misc.box.text}>
                        {type_name}
                      </Text>
                    </View>
                  </Flex>
                  <Text style={styles.navBar.misc.press}>查看</Text>
                </Flex>
              </Touchable>
            )}
            <View style={styles.navBar.bottom.container}>
              <Touchable
                style={{ flex: 1, justifyContent: 'center' }}
                onPress={() => this.sendMsg('您好，方便留一下手机号吗？')}
              >
                <Flex style={styles.navBar.bottom.group.container}>
                  <Image source={require('asset/im/mobile_im.png')} />
                  <Text style={styles.navBar.bottom.group.title}>要手机</Text>
                </Flex>
              </Touchable>
              <View style={styles.navBar.bottom.divider} />
              <Touchable
                style={{ flex: 1, justifyContent: 'center' }}
                onPress={() => this.sendMsg('您好，方便留一下微信号吗？')}
              >
                <Flex style={styles.navBar.bottom.group.container}>
                  <Image source={require('asset/im/wechat_im.png')} />
                  <Text style={styles.navBar.bottom.group.title}>要微信号</Text>
                </Flex>
              </Touchable>
            </View>
          </View>
        );
      }}
    />
  );

  renderAccessory = () => {
    if (!this.props.showContactModal) {
      return null;
    }
    const { user } = this.props;
    const mobile = R.path(['mobile'])(user);
    return (
      <View style={[styles.accessory.container]}>
        <Flex>
          <Touchable
            onPress={() => {
              this.sendMsg(`您好，这是我的手机号 ${mobile}`);
              this.props.toggleContactModal(false);
            }}
          >
            <View style={styles.accessory.group.container}>
              <View style={styles.accessory.group.image}>
                <Image source={require('asset/chat_mobile_big.png')} />
              </View>
              <Text style={styles.accessory.group.title}>发送手机</Text>
            </View>
          </Touchable>
          <Touchable onPress={this.handleSendWechatPress}>
            <View style={styles.accessory.group.container}>
              <View style={styles.accessory.group.image}>
                <Image source={require('asset/chat_wechat_big.png')} />
              </View>
              <Text style={styles.accessory.group.title}>发送微信</Text>
            </View>
          </Touchable>
        </Flex>
      </View>
    );
  };

  render() {
    const {
      data,
      user,
      user_im_id,
      inLastPage,
      showContactModal,
      connected,
    } = this.props;
    return (
      <SafeArea style={styles.container}>
        {this.renderNavBar()}
        {connected && (
          <Chat
            chatRef={ref => {
              this.chatRef = ref;
            }}
            loadEarlier
            renderLoadEarlier={p => {
              if (inLastPage) {
                return null;
              }
              if (R.length(data) < 50) {
                return null;
              }
              return (
                <View style={{ marginVertical: 12 }}>
                  <ActivityIndicator />
                </View>
              );
            }}
            bottomOffset={getBottomSpace()}
            user={{
              _id: user_im_id,
              name: R.path(['realname'])(user),
              avatar: R.path(['avatar_url'])(user),
            }}
            messages={data}
            showAvatarForEveryMessage
            onSend={this.handleSend}
            listViewProps={{
              scrollEventThrottle: 100,
              onTouchStart: () => {
                if (showContactModal) {
                  this.props.toggleContactModal(false);
                  this.forceUpdate();
                }
              },
              onScrollEndDrag: () => {
                if (showContactModal) {
                  this.props.toggleContactModal(false);
                }
              },
            }}
            toggleAccessory={() => {
              Keyboard.dismiss();
              setTimeout(() => {
                this.props.toggleContactModal(true);
              }, 50);
            }}
            accessoryStyle={{
              height: 96,
            }}
            renderAccessory={showContactModal ? this.renderAccessory : null}
            minInputToolbarHeight={!showContactModal ? 44 : 142}
          />
        )}
        <ActionAlert
          visible={this.props.showNotificationModal}
          title="开启推送通知"
          content="及时获知对方回复，把握合作机会"
          actionTitle="立即开启"
          image={require('asset/notification_check.png')}
          action={() => {
            Linking.openURL('app-settings:');
            this.props.setShowNotificationModal(false);
          }}
          onBackdropPress={() => this.props.setShowNotificationModal(false)}
        />
        <NameInputAlert {...this.props} />
      </SafeArea>
    );
  }
}

export default IMPage;
