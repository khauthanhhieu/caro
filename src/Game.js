import React from 'react';
import './Game.css'

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares : Array(400).fill(null),
            xIsNext: true
        }
    }
    renderSquare(i) {
        return <Square 
            value = {this.state.squares[i]}
            onClick = {() => this.handleClick(i)}
        />;
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (squares[i])
            return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }
    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        let table = []
        for (let i = 0; i < 20; i++) {
            var tmp = []
            for (let j = 0; j < 20; j++) {
                tmp.push(this.renderSquare(20*i + j));            
            }
            table.push(
                <div key={i} className="board-row">
                    {tmp}
                </div>
            );
        }
        return (
            <div>
                <div className="status">{status}</div>
                {table}
            </div>
        );
    }
}


class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;