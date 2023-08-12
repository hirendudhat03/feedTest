import {put, call} from 'redux-saga/effects';
import {LoginResponse} from '../Actions/LoginAction';
import {LoaderAction} from '../Actions/LoaderAction';
import {loginApi} from '../Services/commonApi';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navConst} from '../../core/navConst';

export function* LoginSaga(action) {
  const {email, password, navigation} = action;
  try {
    let body = {
      user: {
        email: email, //dasdasd@gmail.com
        password: password, //dsfafsdfsd
      },
    };
    const response = yield call(loginApi, JSON.stringify(body));
    let responseJson = yield response.json();

    if (responseJson.errors && responseJson.errors['email or password']) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: responseJson.errors['email or password'][0],
      });
      yield put(LoaderAction(false));
    }
    if (responseJson.user) {
      AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
      yield put(LoginResponse(responseJson.user));
      yield put(LoaderAction(false));
      navigation.reset({
        routes: [{name: navConst.Dashboard}],
      });
    }
  } catch (error) {
    console.log('login error', error);
    yield put(LoaderAction(false));
  }
}
