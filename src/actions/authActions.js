import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { ROOT_URL, ACCESS_TOKEN } from '../../constants';

import { AUTH_SUCCESS, AUTH_ERROR } from './types';

export function loginUser({ email, password }) {
  return dispatch => {
    return fetch(`${ROOT_URL}/auth/sign_in`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        })
      })
      .then(response => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          AsyncStorage.setItem(ACCESS_TOKEN, response.headers.get('access-token'));
          dispatch({ type: AUTH_SUCCESS });
          Actions.main({ type: ActionConst.RESET });
          return false;
        }
        return response.text();
      })
      .then(res => {
        if (res) {
          throw JSON.parse(res).errors;
        }
      })
      .catch(err => {
        dispatch({ type: AUTH_ERROR, payload: err });
      });
  };
}

export function signupUser({ email, password, passwordConfirmation }) {
  return dispatch => {
    return fetch(`${ROOT_URL}/auth`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirmation
        })
      })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          AsyncStorage.setItem(ACCESS_TOKEN, response.headers.get('access-token'));
          dispatch({ type: AUTH_SUCCESS });
          Actions.main({ type: ActionConst.RESET });
          return false;
        }
        return response.text();
      })
      .then(res => {
        if (res) {
          throw JSON.parse(res).errors.full_messages;
        }
      })
      .catch(err => {
        dispatch({ type: AUTH_ERROR, payload: err });
      });
  };
}
