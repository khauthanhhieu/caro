import { LOGIN } from '../actions/actionTypes';

function auth(state = [], actions) {
  switch (actions.type) {
    case LOGIN:
      // eslint-disable-next-line no-case-declarations
      const user = {
        username: actions.username,
        password: actions.password,
      };
      fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then((res) => res.json())
        .then((result) => console.log(result));

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
