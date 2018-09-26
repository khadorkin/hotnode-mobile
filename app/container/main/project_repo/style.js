import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
  },
  tabBar: {
    container: {
      height: 40,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E7E7E7',
      backgroundColor: 'white',
    },
    tab: {
      paddingBottom: 0,
    },
    text: {
      fontSize: 14,
    },
    underline: {
      height: 0,
    },
  },
  searchBar: {
    container: {
      flex: 1,
      paddingLeft: 12,
      paddingRight: 12,
    },
  },
  listContainer: {
    paddingVertical: 0,
  },
};
