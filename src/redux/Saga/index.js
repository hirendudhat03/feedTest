import {take, takeEvery, takeLatest, all} from 'redux-saga/effects';
import {LoginSaga} from './LoginSaga';
import * as TYPES from '../Services/Type';
import {FeedSaga} from './FeedSaga';
import {SinglePostSaga} from './SinglePostSaga';
import {PostCommentSaga} from './PostCommentSaga';

export default function* root_saga() {
  yield all([
    takeEvery(TYPES.LOGIN_REQUEST, LoginSaga),
    takeEvery(TYPES.FEED_REQUEST, FeedSaga),
    takeEvery(TYPES.POST_REQUEST, SinglePostSaga),
    takeEvery(TYPES.POST_COMMENT_REQUEST, PostCommentSaga),
  ]);
}
