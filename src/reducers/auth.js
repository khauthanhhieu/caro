import { LOGIN, LOGOUT, REGISTER } from '../actions/actionTypes';

const initialState = {
  mess: undefined,
  authed: false,
};

function auth(state = initialState, actions) {
  switch (actions.type) {
    case LOGIN:
      return {
        ...state,
        mess: actions.mess,
        authed: (actions.token !== undefined),
      };
    case LOGOUT:
      return {
        ...state,
        mess: undefined,
        authed: false,
      };
    case REGISTER:
      return {
        ...state,
        mess: actions.mess,
      };
    default:
      return state;
  }
}

export default auth;
