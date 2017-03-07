import { AUTH_SUCCESS, AUTH_ERROR } from '../actions/types';

export default (state = { errors: [] }, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, loggedIn: true, errors: [] };
    case AUTH_ERROR:
      return { ...state, loggedIn: false, errors: action.payload };
    default:
      return state;
  }
};
