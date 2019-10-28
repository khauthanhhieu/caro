import { LOGIN } from '../actions/actionTypes';

const initialState = {
  authed: false,
};

function auth(state = initialState, actions) {
  switch (actions.type) {
    case LOGIN:
      return {
        ...state,
        authed: (actions.token !== undefined),
      };
    default:
      return state;
  }
}

export default auth;
