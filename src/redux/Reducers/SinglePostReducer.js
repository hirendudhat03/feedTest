import {POST_REQUEST, POST_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};

export const SinglePostReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case POST_REQUEST:
      return {
        ...prevState,
        action: action,
      };
    case POST_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
