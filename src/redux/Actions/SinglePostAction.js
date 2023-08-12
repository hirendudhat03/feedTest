import * as TYPES from '../Services/Type';

export function SinglePostResponse(data) {
  return {
    type: TYPES.POST_RESPONSE,
    payload: data,
  };
}

export function SinglePostRequest(slug) {
  return {
    type: TYPES.POST_REQUEST,
    slug: slug,
  };
}
