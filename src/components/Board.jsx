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
        onClick={() => props.onPlace(i)}
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

const mapStateToProps = (state) => ({
  winner: state.game.winner,
  colors: state.game.colors,
  squares: state.game.history[state.game.stepNumber].squares,
  newMove: state.game.history[state.game.stepNumber].newMove,
});

const mapDispatchToProps = (dispatch) => ({
  onPlace: (index) => dispatch(actions.place(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
