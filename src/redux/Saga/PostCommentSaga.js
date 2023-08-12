import {put, call} from 'redux-saga/effects';
import {LoaderAction} from '../Actions/LoaderAction';
import {commentPostApi, feedApi, postApi} from '../Services/commonApi';
import {SinglePostResponse} from '../Actions/SinglePostAction';
import Toast from 'react-native-toast-message';

export function* PostCommentSaga(action) {
  const {slug, comment, token} = action;
  try {
    let bodyData = {
      comment: {
        body: comment,
      },
    };
    const response = yield call(
      commentPostApi,
      slug,
      JSON.stringify(bodyData),
      token,
    );
    let responseJson = yield response.json();
    console.log('response', response.status);
    if (responseJson?.status === 'error') {
      Toast.show({
        type: 'error',
        text1: 'Comment Error',
        text2: responseJson?.message,
      });
    }
    if (response.status) {
      Toast.show({
        type: 'success',
        text1: 'Comment Add Success',
      });
    }
    yield put(LoaderAction(false));
  } catch (error) {
    console.log('post error', error);
    yield put(LoaderAction(false));
  }
}
