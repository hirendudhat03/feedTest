import * as TYPES from '../Services/Type';

export function LoginResponse(user) {
  return {
    type: TYPES.LOGIN_RESPONSE,
    payload: user,
  };
}

export function LoginRequest(email, password, navigation) {
  return {
    type: TYPES.LOGIN_REQUEST,
    email: email,
    password: password,
    navigation: navigation,
  };
}
