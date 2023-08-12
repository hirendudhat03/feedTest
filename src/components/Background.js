import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {theme} from '../core/theme';
import {Images} from '../core/images';

const Background = ({children}) => {
  return (
    <ImageBackground
      source={Images.background}
      resizeMode="repeat"
      style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
