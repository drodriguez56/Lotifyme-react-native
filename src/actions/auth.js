import { REGISTER_USER } from './types';

export function registerUser({ email, password }) {

  return {
    type: REGISTER_USER,
    payload: ''
  };
}
