import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Fonts} from '../core/fonts';
import {theme} from '../core/theme';
import {Images} from '../core/images';

const DashboardHeader = ({user, exitPress}) => {
  return (
    <View style={styles.container}>
      {user && (
        <Image
          source={{uri: user.image}}
          style={styles.avtar}
          resizeMode="contain"
        />
      )}

      <Text style={styles.username}>Dashboard</Text>
      <TouchableOpacity onPress={exitPress}>
        <Image
          source={Images.exit}
          style={styles.exit}
          resizeMode="contain"
          tintColor={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};
export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avtar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  exit: {
    width: 30,
    height: 30,
  },
  username: {
    fontFamily: Fonts.Poppins_Bold,
    color: theme.colors.background,
    textAlign: 'center',
  },
});
