import {Dimensions, Platform} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#f13a59',
    dashboardBackground: '#07080B',
    itemBackground: '#162847',
  },
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  isIOS: Platform.OS === 'ios',
};
