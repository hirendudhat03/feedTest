import {FEED_RESPONSE, FEED_REQUEST} from '../Services/Type';

const initialState = {
  data: null,
};

export const FeedReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case FEED_REQUEST:
      return {
        ...prevState,
        action: action,
      };
    case FEED_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
