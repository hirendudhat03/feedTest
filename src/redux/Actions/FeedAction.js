import * as TYPES from '../Services/Type';

export function FeedResponse(data) {
  return {
    type: TYPES.FEED_RESPONSE,
    payload: data,
  };
}

export function FeedRequest(url) {
  return {
    type: TYPES.FEED_REQUEST,
    url: url,
  };
}
