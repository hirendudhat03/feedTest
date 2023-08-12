import React from 'react';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';
import {Fonts} from '../core/fonts';
import {StyleSheet} from 'react-native';

const Header = props => {
  return <Text style={styles.header} {...props} />;
};
export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    fontFamily: Fonts.Poppins_Medium,
    color: theme.colors.primary,
    paddingVertical: 12,
  },
});
