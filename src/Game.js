/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './Game.css';
import Board from './Board';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(400).fill(null),
        newMove: null,
      }],
      stepNumber: 0,
      colors: Array(400).fill(false),
      xIsNext: true,
    };
  }

  isWinBy(current, x, y, vector) {
    const { squares } = current;
    const { colors } = this.state;
    const XO = squares[y * 20 + x];
    if (!XO) {
      return null;
    }
    for (let i = 0; i < 5; i += 1) {
      const sx = x - i * vector[0];
      const sy = y - i * vector[1];
      let flat = true;
      for (let j = 0; j < 5; j += 1) {
        const X = sx + j * vector[0];
        const Y = sy + j * vector[1];
        if (X >= 20 || Y >= 20 || X < 0 || Y < 0 || squares[Y * 20 + X] !== XO) {
          flat = false;
          break;
        }
      }
      if (flat === true) {
        let OX = null;
        if (XO === 'O') {
          OX = 'X';
        } else if (XO === 'X') {
          OX = 'O';
        }
        if (squares[(sy - vector[1]) * 20 + sx - vector[0]] !== OX
            || squares[(sy + 5 * vector[1]) * 20 + sx + 5 * vector[0]] !== OX) {
          for (let j = 0; j < 5; j += 1) {
            const X = sx + j * vector[0];
            const Y = sy + j * vector[1];
            colors[Y * 20 + X] = true;
          }
          return XO;
        }
      }
    }
    return null;
  }


  calculateWinner(current) {
    const index = current.newMove;
    const x = index % 20;
    const y = Math.floor(index / 20);
    const vector = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let i = 0; i < 4; i += 1) {
      const XO = this.isWinBy(current, x, y, vector[i]);
      if (XO) { return XO; }
    }
    return null;
  }


  handleClick(i) {
    const { state } = this;
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(current, i) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        newMove: i,
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      colors: Array(400).fill(false),
      xIsNext: (step % 2) === 0,
    });
  }

  replay() {
    this.setState({
      history: [{
        squares: Array(400).fill(null),
        newMove: null,
      }],
      stepNumber: 0,
      colors: Array(400).fill(false),
      xIsNext: true,
    });
  }

  render() {
    const { history, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = this.calculateWinner(current);

    const moves = history.map((step, move) => {
      const desc = move ? (`Go to move #${move}`) : 'Go to game start';
      const cname = (move === stepNumber) ? 'selected' : '';
      return (
        <li key={move.id}>
          <button type="button" className={cname} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    const { xIsNext, colors } = this.state;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            colors={colors}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <button type="button" onClick={this.replay.bind(this)}>
                    Replay
        </button>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
