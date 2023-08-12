import ApiConstants from './ApiContstants';
import {Method} from './ApiMethod';

export async function loginApi(bodyData) {
  try {
    return fetch(ApiConstants.BASE_URL + ApiConstants.Login_EndPoint, {
      method: Method.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyData,
    });
  } catch (error) {
    return error;
  }
}

export async function feedApi(url) {
  try {
    return fetch(ApiConstants.BASE_URL + ApiConstants.Feed_EndPoint + url, {
      method: Method.GET,
    });
  } catch (error) {
    return error;
  }
}

export async function postApi(slug) {
  try {
    return fetch(ApiConstants.BASE_URL + ApiConstants.Post_EndPoint + slug, {
      method: Method.GET,
    });
  } catch (error) {
    return error;
  }
}

export async function commentPostApi(slug, data, token) {
  console.log('APi Slug', slug);
  console.log('APi data', data);
  console.log('APi token', token);
  console.log(
    ApiConstants.BASE_URL + ApiConstants.Post_EndPoint + slug + '/comments',
  );
  try {
    return fetch(
      ApiConstants.BASE_URL + ApiConstants.Post_EndPoint + slug + '/comments',
      {
        method: Method.POST,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: data,
      },
    );
  } catch (error) {
    return error;
  }
}
