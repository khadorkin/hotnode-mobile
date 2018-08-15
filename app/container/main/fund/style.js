import { Dimensions } from 'react-native';
import { navBarHeight } from 'component/navBar';

export const deviceWidth = Dimensions.get('window').width;
export const indicatorWidth = 42;
const tabWidth = 72;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  initialLayout: {
    height: 0,
    width: Dimensions.get('window').width,
  },
  tabBar: {
    container: {
      backgroundColor: 'transparent',
      height: navBarHeight,
      justifyContent: 'flex-end',
    },
    tab: {
      width: tabWidth,
      padding: 0,
      marginBottom: 8,
    },
    label: {
      fontSize: 14,
      color: 'white',
    },
    indicator: {
      height: 0,
    },
  },
};
