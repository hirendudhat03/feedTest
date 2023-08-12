import * as TYPES from '../Services/Type';

export function PostCommentResponse(data) {
  return {
    type: TYPES.POST_COMMENT_RESPONSE,
    payload: data,
  };
}

export function PostCommentRequest(slug, comment, token) {
  return {
    type: TYPES.POST_COMMENT_REQUEST,
    slug: slug,
    comment: comment,
    token: token,
  };
}
