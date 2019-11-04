/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
import {
  PLACE, RESET, SET_WINNER, JUMP_TO,
} from '../actions/actionTypes';

const initialState = {
  history: [{
    squares: Array(400).fill(undefined),
    colors: Array(400).fill(false),
    newMove: undefined,
    winner: undefined,
  }],
  stepNumber: 0,
  xIsNext: true,
};

function game(state = initialState, actions) {
  switch (actions.type) {
    case PLACE: {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (squares[actions.index]) return state;
      squares[actions.index] = state.xIsNext ? 'X' : 'O';
      return {
        ...state,
        history: history.concat([{
          squares,
          newMove: actions.index,
          colors: Array(400).fill(false),
        }]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      };
    }
    case RESET:
      return initialState;
    case JUMP_TO:
      return {
        ...state,
        stepNumber: actions.step,
        xIsNext: (actions.step % 2) === 0,
      };
    case SET_WINNER:
    {
      const history = state.history.slice();
      const current = history[history.length - 1];
      const colors = current.colors.slice();
      for (let i = 0; i < actions.line.length; i += 1) {
        colors[actions.line[i]] = true;
      }
      current.colors = colors;
      current.winner = actions.winner;
      history[history.length - 1] = current;
      return {
        ...state,
        history,
      };
    }

    default:
      return state;
  }
}

export default game;
