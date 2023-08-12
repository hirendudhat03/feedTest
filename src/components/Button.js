import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {theme} from '../core/theme';
import {Fonts} from '../core/fonts';

const Button = ({mode, style, ...props}) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && {backgroundColor: theme.colors.surface},
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
};
export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 15,
    lineHeight: 26,
  },
});
