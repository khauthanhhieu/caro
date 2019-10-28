import { LOGIN } from '../actions/actionTypes';

function auth(state = [], actions) {
  switch (actions.type) {
    case LOGIN:
      return {
        ...state,
        username: actions.username,
        password: actions.password,
      };
    default:
      return state;
  }
}

export default auth;
