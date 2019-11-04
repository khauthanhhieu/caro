/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Row, Container, Col,
} from 'react-bootstrap';
import './Game.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Board from './Board';

class Game extends React.Component {
  render() {
    const { history, stepNumber } = this.props;
    const current = history[stepNumber];
    const { winner } = current;
    const moves = history.map((step, move) => {
      const desc = move ? (`Lượt đi #${move}`) : 'Bắt đầu';
      const cname = (move === stepNumber) ? 'selected' : '';
      return (
        <li key={move.id}>
          <Button type="button" className={cname} onClick={() => this.props.onJump(move)}>{desc}</Button>
        </li>
      );
    });

    let status;
    const { xIsNext } = this.props;
    if (winner) {
      status = `Người thắng : ${winner}`;
    } else {
      status = `Lượt đi kế tiếp: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <Container>
        <Row>
          <Col md={8}>
            <Board />
          </Col>
          <Col>
            <Button type="button" onClick={this.props.onReset.bind(this)}>
              Chơi lại
            </Button>
            <div>{status}</div>
            <div className="scroll-y">
              <ol>{moves}</ol>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  history: state.game.history,
  stepNumber: state.game.stepNumber,
  colors: state.game.colors,
  xIsNext: state.game.xIsNext,
});

const mapDispatchToProps = (dispatch) => ({
  onReset: () => dispatch(actions.reset()),
  onJump: (step) => dispatch(actions.jumpTo(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
