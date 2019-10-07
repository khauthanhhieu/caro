import {
  PLACE, SET_PLAYER_TURN, RESET, SET_WINNER,
} from './actionTypes';

export function place(index) {
  return { type: PLACE, index };
}

export function setPlayerTurn(player) {
  return { type: SET_PLAYER_TURN, player };
}

export function reset() {
  return { type: RESET };
}

export function setWinner(winner) {
  return { type: SET_WINNER, winner };
}
