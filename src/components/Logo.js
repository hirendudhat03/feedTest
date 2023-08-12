import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Images} from '../core/images';

const Logo = () => {
  return <Image source={Images.logo} style={styles.image} />;
};
export default Logo;

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
});
