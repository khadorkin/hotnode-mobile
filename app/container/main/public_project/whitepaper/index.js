import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { compose, withState } from 'recompose';
import PDF from 'react-native-pdf';
import Orientation from 'react-native-orientation';
import R from 'ramda';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as WeChat from 'react-native-wechat';
import Config from 'runtime/index';

import NavBar from 'component/navBar';

import styles from './style';

@connectActionSheet
@global.bindTrack({
  page: '项目公海白皮书详情',
  name: 'App_PublicProjectWhitePaperOperation',
})
@compose(withState('navBarHidden', 'setNavBarHidden', false))
export default class WhitePaperDetail extends Component {
  state = {
    isWXAppSupportApi: false,
  };
  componentDidMount() {
    this.checkWechatAval();
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this.orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  onPressShare = () => {
    const { navigation } = this.props;
    this.props.showActionSheetWithOptions(
      {
        options: ['分享至朋友圈', '分享至微信', '取消'],
        cancelButtonIndex: 2,
      },
      index => {
        const id = navigation.getParam('id');
        if (!this.state.isWXAppSupportApi || index === 2) {
          return;
        }

        const request = {
          type: 'news',
          webpageUrl: `${Config.MOBILE_SITE}/white-paper?id=${id}`,
          title: `「白皮书」${navigation.getParam('title')}`,
          description: '来 Hotnode, 发现最新最热项目！',
          thumbImage:
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/pdf.png',
        };
        if (index === 1) {
          WeChat.shareToSession(request);
        } else if (index === 0) {
          WeChat.shareToTimeline(request);
        }
      },
    );
  };

  checkWechatAval = async () => {
    this.setState({
      isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
    });
  };

  orientationDidChange = orientation => {
    this.props.setNavBarHidden(orientation === 'LANDSCAPE');
  };
  render() {
    const { navigation, navBarHidden } = this.props;
    let pdf_url = navigation.getParam('pdf_url');
    pdf_url = decodeURI(pdf_url);
    pdf_url = encodeURI(pdf_url);

    const title = navigation.getParam('title');

    return (
      <View style={styles.container}>
        {R.not(navBarHidden) && (
          <NavBar
            gradient
            back
            title={title}
            titleContainerStyle={{ paddingHorizontal: 30 }}
            renderRight={() => (
              <TouchableWithoutFeedback onPress={this.onPressShare}>
                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>分享</Text>
              </TouchableWithoutFeedback>
            )}
          />
        )}
        <PDF
          style={styles.pdf}
          source={{
            uri: pdf_url,
            cache: true,
          }}
          // onLoadComplete={(numberOfPages, filePath) => {
          //   console.log(`number of pages: ${numberOfPages}`);
          // }}
          // onPageChanged={(page, numberOfPages) => {
          //   console.log(`current page: ${page}`);
          // }}
          // onError={error => {
          //   console.log(error);
          // }}
        />
      </View>
    );
  }
}
