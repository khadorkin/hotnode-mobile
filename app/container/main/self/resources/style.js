import { Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const indicatorWidth = 42;
const tabWidth = 78;
export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  initialLayout: {
    height: 0,
    width: Dimensions.get('window').width,
  },
  navBar: {},
  searchBar: {
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingLeft: 12 + 24,
      paddingRight: 12,
    },
  },
  tabBar: {
    container: {
      backgroundColor: 'transparent',
    },
    tab: {
      height: 44,
      width: tabWidth,
      padding: 0,
    },
    label: {
      fontSize: 14,
    },
    indicator: {
      height: 3,
      backgroundColor: 'white',
      width: indicatorWidth,
      left: (tabWidth - indicatorWidth) / 2,
    },
  },
};