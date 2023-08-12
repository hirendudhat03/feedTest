import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {theme} from '../core/theme';
import {Fonts} from '../core/fonts';

const TextInput = ({errorText, description, ...props}) => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};
export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    fontFamily: Fonts.Poppins_Medium,
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.Poppins_Medium,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    fontFamily: Fonts.Poppins_Medium,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
