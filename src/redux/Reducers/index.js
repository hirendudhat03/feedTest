import {combineReducers} from 'redux';

import {LoginReducer} from './LoginReducer';
import {LoaderReducer} from './LoaderReducer';
import {FeedReducer} from './FeedReducer';
import {SinglePostReducer} from './SinglePostReducer';
import {PostCommentReducer} from './PostCommentReducer';

export default combineReducers({
  login: LoginReducer,
  loader: LoaderReducer,
  feed: FeedReducer,
  post: SinglePostReducer,
  comment: PostCommentReducer,
});
