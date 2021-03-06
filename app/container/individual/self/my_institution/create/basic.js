import React, { PureComponent } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import PickerSelect from 'component/picker';
import EnhancedScroll from 'component/enhancedScroll';
import InputItem from 'component/inputItem';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import Wrapper from './index';
import styles from './style';

@connect(({ institution_create, global }) => ({
  current: R.pathOr({}, ['current'])(institution_create),
  institution_type: R.pathOr([], ['constants', 'industry_type'])(global),
}))
@createForm({
  onValuesChange: ({ dispatch, current }, changed) => {
    dispatch({
      type: 'institution_create/saveCurrent',
      payload: {
        ...changed,
      },
    });
  },
  mapPropsToFields: ({ current }) => {
    return R.pipe(
      R.keys,
      R.reduce(
        (acc, key) => ({
          ...acc,
          [key]: createFormField({
            value: current[key],
          }),
        }),
        {},
      ),
    )(current);
  },
})
class BasicInfo extends PureComponent {
  handleUpload = async response => {
    Toast.loading('上传中...', 0);
    const { url } = await uploadImage({
      image: response,
      type: 'avatar',
    });
    Toast.hide();

    this.props.form.setFieldsValue({
      logo_url: url,
    });
  };

  handleLogoPress = () => {
    launchImagePicker(response => {
      if (!response.didCancel && !response.error) {
        this.handleUpload(response);
      }
    });
  };

  // handleWhitepaperPress = () => {};

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    const { institution_type } = this.props;
    return (
      <Wrapper {...this.props}>
        <EnhancedScroll>
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '请选择机构类型',
              },
            ],
          })(
            <InputItem
              required
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="类型"
              placeholder="请选择机构类型"
              showArrow
              renderContent={({ onChange, value: v }) => {
                if (Platform.OS === 'ios') {
                  return (
                    <View style={{ flex: 1 }}>
                      <PickerSelect
                        hideIcon
                        placeholder={{
                          label: '请选择机构类型',
                          value: null,
                        }}
                        data={institution_type.map(i => ({
                          label: i.name,
                          value: i.value,
                        }))}
                        onChange={onChange}
                        value={v}
                      />
                    </View>
                  );
                } else {
                  return (
                    <PickerSelect
                      style={{
                        viewContainer: { width: 200, alignSelf: 'flex-end' },
                      }}
                      hideIcon
                      placeholder={{
                        label: '请选择机构类型',
                        value: null,
                      }}
                      data={institution_type.map(i => ({
                        label: i.name,
                        value: i.value,
                      }))}
                      onChange={onChange}
                      value={v}
                    />
                  );
                }
              }}
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('type')}
            />,
          )}
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入机构名称',
              },
            ],
          })(
            <InputItem
              required
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="名称"
              placeholder="请输入机构名称"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('name')}
            />,
          )}
          {getFieldDecorator('logo_url', {
            rules: [{ required: true, message: '请上传 Logo' }],
          })(
            <InputItem
              required
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="Logo"
              placeholder="请上传 Logo"
              showArrow
              renderContent={({ value }) => (
                <Image
                  style={styles.avatar}
                  source={
                    value
                      ? { uri: value }
                      : require('asset/project_create/logo_placeholder.png')
                  }
                />
              )}
              inputProps={{ style: styles.inputItem.input }}
              onPress={this.handleLogoPress}
              error={getFieldError('logo_url')}
            />,
          )}
          {/* {getFieldDecorator('white_paper')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="白皮书"
              placeholder="请上传白皮书"
              showArrow
              renderContent={() => (
                <Text style={styles.inputItem.greyOutText}>请上传白皮书</Text>
              )}
              inputProps={{ style: styles.inputItem.input }}
              onPress={this.handleWhitepaperPress}
            />,
          )} */}
          {getFieldDecorator('site_url')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="官网"
              placeholder="请输入机构官网"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
        </EnhancedScroll>
      </Wrapper>
    );
  }
}

export default BasicInfo;
