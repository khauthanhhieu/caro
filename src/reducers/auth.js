import {
  LOGIN, LOGOUT, REGISTER, LOAD_PROPS,
} from '../actions/actionTypes';

const initialState = {
  mess: undefined,
  authed: false,
  user: undefined,
};

function auth(state = initialState, actions) {
  switch (actions.type) {
    case LOGIN:
      return {
        ...state,
        mess: actions.mess,
        authed: (actions.token !== undefined),
        user: actions.user,
      };
    case LOGOUT:
      return {
        ...state,
        mess: undefined,
        authed: false,
        user: undefined,
      };
    case REGISTER:
      return {
        ...state,
        mess: actions.mess,
      };
    case LOAD_PROPS:
      return {
        ...state,
        authed: true,
        user: actions.user,
      };
    default:
      return state;
  }
}

export default auth;
