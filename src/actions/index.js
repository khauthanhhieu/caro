import Cookies from 'js-cookie';
import {
  PLACE, RESET, SET_WINNER, JUMP_TO, LOGIN, LOGOUT, REGISTER,
} from './actionTypes';

export function place(index) {
  return { type: PLACE, index };
}

export function reset() {
  return { type: RESET };
}

export function setWinner(winner) {
  return { type: SET_WINNER, winner };
}

export function jumpTo(step) {
  return { type: JUMP_TO, step };
}

export function login(username, password) {
  return async (dispatch) => {
    const result = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());
    let mess = '';
    let user;
    if (result.isSuccess === true) {
      mess = undefined;
      user = await fetch('/api/me', {
        method: 'GET',
        headers: {
          token: result.token,
        },
      }).then((res) => res.json()).then((data) => data.user);
    } else {
      mess = 'Tên đăng nhập hoặc mật khẩu không đúng !';
    }
    dispatch({
      type: LOGIN, mess, token: result.token, user,
    });
  };
}

export function logout() {
  Cookies.remove('access_token');
  return { type: LOGOUT };
}

export function register(user) {
  return async (dispatch) => {
    const result = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
    dispatch({ type: REGISTER, mess: result.mess });
  };
}
