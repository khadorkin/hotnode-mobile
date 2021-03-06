import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    right: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
    },
  },
  formTitle: {
    container: {
      paddingVertical: 15,
      marginLeft: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    text: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
  },
  inputItem: {
    container: {
      paddingVertical: 20,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.65)',
    },
    input: {
      textAlign: 'right',
    },
    greyOutText: {
      color: 'rgba(0, 0, 0, 0.25)',
    },
    valueText: {
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },
  delete: {
    container: {
      margin: 12,
      alignSelf: 'flex-end',
    },
    text: {
      color: '#F55454',
      fontSize: 13,
    },
  },
  addMore: {
    container: {
      marginVertical: 18,
      alignSelf: 'center',
    },
    text: {
      fontSize: 13,
      color: '#1890FF',
      fontWeight: 'bold',
    },
  },
  error: {
    container: {
      padding: 12,
    },
  },
  avatar: {
    height: 38,
    width: 38,
    borderRadius: 19,
  },
  forward_pc: {
    container: {
      marginVertical: 24,
      alignSelf: 'center',
      height: 26.5,
      borderRadius: 2,
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 12,
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
};
