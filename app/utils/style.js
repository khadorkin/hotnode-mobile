import React from 'react';
import { Image, Text, Platform, StyleSheet } from 'react-native';

export const raised = {
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(0,0,0, .4)',
      shadowOffset: { height: 1, width: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
    },
    android: {
      elevation: 2,
    },
  }),
};

export const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(44, 64, 83, 0.1)',
      shadowRadius: 2,
      shadowOffset: {
        width: StyleSheet.hairlineWidth,
        height: 1,
      },
      shadowOpacity: 1,
    },
    android: {
      elevation: 2,
    },
  }),
};

export const medalMap = index => {
  switch (index) {
    case 0:
      return <Image source={require('asset/medal/gold.png')} />;
    case 1:
      return <Image source={require('asset/medal/silver.png')} />;
    case 2:
      return <Image source={require('asset/medal/brown.png')} />;
    default:
      return (
        <Text style={{ fontSize: 12, color: '#999999' }}>#{index + 1}</Text>
      );
  }
};

export const iconMap = (name, props) => {
  switch (name) {
    case 'BTC':
      return <Image {...props} source={require('asset/crypto/BTC.png')} />;
    case 'ETH':
      return <Image {...props} source={require('asset/crypto/ETH.png')} />;
    case 'EOS':
      return <Image {...props} source={require('asset/crypto/EOS.png')} />;
    case 'USDT':
      return <Image {...props} source={require('asset/crypto/USDT.png')} />;
    default:
      return null;
  }
};
