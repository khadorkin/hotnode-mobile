import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  separator: {
    height: 8,
    backgroundColor: '#F9F9F9',
  },
  navBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  projectCreate: {
    container: {
      flex: 1,
    },
    top: {
      container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 36,
      },
      image: {
        marginTop: 24,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1890FF',
        marginTop: 24,
      },
      subtitle: {
        marginTop: 12,
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.65)',
        lineHeight: 20,
      },
    },
    bottom: {
      container: {
        paddingLeft: 20,
        paddingRight: 12,
        paddingBottom: 45,
      },
      item: {
        container: {
          height: 70,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#E9E9E9',
          paddingRight: 24,
        },
        block: {
          height: 15,
          width: 3.5,
          backgroundColor: '#1890FF',
        },
        title: {
          marginLeft: 12.5,
          fontSize: 13,
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 'bold',
        },
        subtitle: {
          marginLeft: 16,
          marginTop: 12,
          fontSize: 12,
          color: 'rgba(0, 0, 0, 0.45)',
        },
        claim: {
          color: '#1890FF',
          fontSize: 13,
          fontWeight: 'bold',
        },
      },
    },
  },
};
