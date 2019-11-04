/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

function Square(props) {
  const { color, value, isNew } = props;
  const name = `square ${color ? 'win' : ''} ${isNew ? 'new' : ''}`;
  return (
    <button type="button" className={name} onClick={() => props.onClick()}>
      {value}
    </button>
  );
}


class Board extends React.Component {
  onClickSquare(i) {
    if (this.props.winner) {
      return;
    }
    this.props.onPlace(i);
    const { winner, line } = this.calculateWinner(i);
    if (winner) {
      this.props.setWinner(winner, line);
    }
  }

  calculateWinner(index) {
    const x = index % 20;
    const y = Math.floor(index / 20);
    const vectors = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (let i = 0; i < 4; i += 1) {
      const result = this.isWinBy(x, y, vectors[i]);
      if (result.winner) { return result; }
    }
    return { winner: undefined, line: undefined };
  }

  isWinBy(x, y, vector) {
    const { squares, newMove } = this.props;
    const XO = (squares[newMove] === 'X') ? 'O' : 'X';
    const OX = (XO === 'X') ? 'O' : 'X';
    let start_x = x - 4 * vector[0];
    let start_y = y - 4 * vector[1];

    let Flat = false;
    for (let i = 0; i < 5; i += 1) {
      let flat = true;
      for (let j = 0; j < 5; j += 1) {
        const X = start_x + j * vector[0];
        const Y = start_y + j * vector[1];
        if (X < 0 || Y < 0 || X > 19 || Y > 19) {
          flat = false;
          break;
        } else if (X === x && Y === y) {
          flat = true;
        } else if (squares[Y * 20 + X] !== XO) {
          flat = false;
          break;
        }
      }
      if (flat === true) {
        Flat = true;
        break;
      }
      start_x += vector[0];
      start_y += vector[1];
    }
    if (Flat === true) {
      if (squares[(start_y - vector[1]) * 20 + start_x - vector[0]] !== OX
      || squares[(start_y + 5 * vector[1]) * 20 + start_x + 5 * vector[0]] !== OX) {
        const winner = XO;
        const line = [];
        for (let i = 0; i < 5; i += 1) {
          const rX = start_x + i * vector[0];
          const rY = start_y + i * vector[1];
          line.push(rY * 20 + rX);
        }
        return { winner, line };
      }
    }
    return { winner: undefined, line: undefined };
  }

  renderSquare(i) {
    const { props } = this;
    let isNew = false;
    if (i === props.newMove) {
      isNew = true;
    }
    return (
      <Square
        value={props.squares[i]}
        color={props.colors[i]}
        isNew={isNew}
        onClick={() => this.onClickSquare(i)}
      />
    );
  }

  render() {
    const table = [];
    for (let i = 0; i < 20; i += 1) {
      const tmp = [];
      for (let j = 0; j < 20; j += 1) {
        tmp.push(this.renderSquare(20 * i + j));
      }
      table.push(
        <div key={i} className="board-row">
          {tmp}
        </div>,
      );
    }
    return (
      <div>
        {table}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const curr = state.game.history[state.game.stepNumber];
  return ({
    winner: curr.winner,
    colors: curr.colors,
    squares: curr.squares,
    newMove: curr.newMove,
  });
}

const mapDispatchToProps = (dispatch) => ({
  onPlace: (index) => dispatch(actions.place(index)),
  setWinner: (winner, line) => dispatch(actions.setWinner(winner, line)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
