import {put, call} from 'redux-saga/effects';
import {LoaderAction} from '../Actions/LoaderAction';
import {feedApi, postApi} from '../Services/commonApi';
import {SinglePostResponse} from '../Actions/SinglePostAction';

export function* SinglePostSaga(action) {
  const {slug} = action;
  try {
    const response = yield call(postApi, slug);
    let responseJson = yield response.json();
    if (responseJson?.article) {
      yield put(SinglePostResponse(responseJson.article));
    }
    yield put(LoaderAction(false));
  } catch (error) {
    console.log('post error', error);
    yield put(LoaderAction(false));
  }
}
