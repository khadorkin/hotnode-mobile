import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import NavBar from 'component/navBar';
import ChangeLogItem from './item';
import styles from './style';

class ChangeLog extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient back title="版本更新" />
        <ScrollView>
          <ChangeLogItem
            version="v7.4.1"
            date="2019-01-04"
            changelog={[
              '评级机构榜单，优质机构优先露出',
              '评级机构所评项目，评级结果更突出',
              '聊天页面增加用户项目/机构信息，随时可查看其项目/机构信息',
              '强化机构和项目入驻按钮，入驻摩擦更小',
              '入驻说明优化，减少使用困惑',
            ]}
          />
          <ChangeLogItem
            version="v7.2.0"
            date="2018-12-14"
            changelog={[
              '首页新增加Dapp项目精选合集，从八个市场维度为您挑选最全的Dapp合集。',
              '新增研究和评级机构研报展示功能，为您收集关联相关机构最新研报。',
              '新增公链生态项目集合，网罗全网最优质公链相关项目。',
              '首页列表内容更新，为您提供行业最优信息资源',
              '优化行业指数项目样式，行业冷暖一目了然',
              '更新认领成员聊天功能显示样式，带给您更加舒适的合作体验。',
              '综合全网评级信息给您提供最具代表性的综合项目得分',
              '增加新的项目机构入驻入口触发机制，带给您更加完善的入驻体验。',
            ]}
          />
          <ChangeLogItem
            version="v7.0.0"
            date="2018-12-01"
            changelog={[
              '上线 IM 聊天功能，可以直接联系机构、项目方',
              '其他优化',
            ]}
          />
          <ChangeLogItem
            version="v6.8.0"
            date="2018-11-23"
            changelog={[
              '新增邀请项目/机构入驻，入驻速度加快80%',
              '更新指数模型，真切还原市场热度',
              '全流程功能优化，各个环节使用更顺滑',
              '其他优化',
            ]}
          />
          <ChangeLogItem
            version="v6.7.0"
            date="2018-11-16"
            changelog={[
              '新增首页搜索',
              '新增项目评级可视化',
              '新增项目亮点可筛选',
              '新增项目周报填写及展示',
              '新增新用户登录推荐项目',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v6.6.0"
            date="2018-11-10"
            changelog={[
              'Hotnode 指数及项目评分，通过各项指标量化行业趋势',
              '更多维度的项目标签，帮您更快定位好项目',
              '分享项目 web 页到微信，体验更佳',
              '机构入驻，方便维护信息',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v6.5.0"
            date="2018-11-04"
            changelog={[
              '项目方入驻',
              '机构入驻，投资机构、公关、媒体、交易所资源全面贯通',
              '新增研报集及分享，行业热点深度解读',
              '新增项目集及分享，搜罗全网「稳定币」、「STO」',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v6.2.0"
            date="2018-10-12"
            changelog={[
              '项目大全新增可按领域、机构筛选，方便查找',
              '项目大全新增「稳定币专场」、「STO专场」，帮您追踪市场热点项目',
              '项目详情扩充「媒体信息」、「路线图」、「项目评级」',
              '新增「公关服务」，找服务上 Hotnode',
              '新增加入 Hotnode 官方微信群，7*24小时为您服务',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v6.1.0"
            date="2018-09-29"
            changelog={[
              '首页全面改版，更丰富的内容入口',
              '增加找会议',
              '增加机构信息',
              '增加快讯信息流',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v6.0.0"
            date="2018-09-22"
            changelog={[
              '开放个人版6000+项目库',
              '新增项目搜索',
              'bug修复及交互优化',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.5.0"
            date="2018-09-08"
            changelog={[
              '新增项目公海，优质项目供您挑选',
              '新增评级、研报，深度观点一手掌握',
              '新增机构成员的默认角色',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.1.4"
            date="2018-08-28"
            changelog={[
              '全新的基金管理模块, 让你对基金情况了如指掌',
              '焕然一新的投资库, 项目细分逻辑清晰明了',
              '新增我的同事功能, 让你与伙伴们高效沟通',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.1.1"
            date="2018-08-14"
            changelog={['Dashboard 底部其他项目 UI 优化', 'Bug 修复']}
          />
          <ChangeLogItem
            version="v5.1.0"
            date="2018-08-13"
            changelog={[
              '投资库交互形式全新升级，滑动切换，便捷高效',
              '项目详情页投资数量 UI 优化',
              '修复人脉资源库数据同步的问题',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.5"
            date="2018-08-08"
            changelog={[
              '支持公司创建',
              '支持公司信息编辑',
              '支持个人信息编辑',
              '投资回报率 UI 优化',
              '热更新页面优化',
              '新增版本更新页',
              '项目添加新增清空按钮，录入更便捷',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.4"
            date="2018-08-07"
            changelog={[
              '登录页重构，支持用户重置密码',
              'Dashboard 缺省页重构，一键启动项目录入，方便快捷',
              '项目详情页投资金额/数量 UI 优化',
              '我的模块个人信息卡片点击优化',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.3"
            date="2018-08-05"
            changelog={['新增神策埋点能力', 'Bug 修复']}
          />
          <ChangeLogItem
            version="v5.0.2"
            date="2018-08-03"
            changelog={[
              'Dashboard 新增基金投资项目展示，一键跳转项目详情页',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.1"
            date="2018-08-02"
            changelog={[
              'Dashboard 新增分享页，支持微信好友、朋友圈、保存到本地相册',
              '项目添加入口位置调整、视觉焕然一新',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.0"
            date="2018-07-27"
            changelog={[
              '移动端新增项目添加功能，允许投资人随时随地录入项目',
              '新增我的模块，支持用户基本信息的展示、登出等',
              'Bug 修复',
            ]}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ChangeLog;
