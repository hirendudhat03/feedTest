import React, {useEffect, useState} from 'react';
import {Provider} from 'react-native-paper';
import {theme} from '../core/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailScreen from '../screens/DetailScreen';
import {navConst} from '../core/navConst';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [initialRoute, setInitialRoute] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('user').then(res => {
      if (res !== undefined && res !== null) {
        if (res) {
          setInitialRoute(navConst.Dashboard);
        } else {
          setInitialRoute(navConst.LoginScreen);
        }
      } else {
        setInitialRoute(navConst.LoginScreen);
      }
    });
  }, []);
  return (
    initialRoute && (
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name={navConst.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={navConst.Dashboard} component={Dashboard} />
            <Stack.Screen
              name={navConst.DatailScreen}
              component={DetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  );
};
export default Navigation;
