import {put, call} from 'redux-saga/effects';
import {LoaderAction} from '../Actions/LoaderAction';
import {feedApi} from '../Services/commonApi';
import {FeedResponse} from '../Actions/FeedAction';

export function* FeedSaga(action) {
  const {url} = action;
  try {
    const response = yield call(feedApi, url);
    let responseJson = yield response.json();
    if (responseJson?.articles) {
      yield put(FeedResponse(responseJson.articles));
    }
    yield put(LoaderAction(false));
  } catch (error) {
    console.log('feed error', error);
    yield put(LoaderAction(false));
  }
}
