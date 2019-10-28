import { LOGIN } from '../actions/actionTypes';

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
    default:
      return state;
  }
}

export default auth;
