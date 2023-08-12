import {POST_COMMENT_REQUEST, POST_COMMENT_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};

export const PostCommentReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case POST_COMMENT_REQUEST:
      return {
        ...prevState,
        action: action,
      };
    case POST_COMMENT_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
