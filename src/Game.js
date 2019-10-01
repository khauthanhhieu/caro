import React from 'react';
import './Game.css'
import './App.css';

class Square extends React.Component {
    render() {
        var name = "square " + (this.props.color ? "win" : "")
        return (
            <button className={name} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                color={this.props.colors[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let table = []
        for (let i = 0; i < 20; i++) {
            var tmp = []
            for (let j = 0; j < 20; j++) {
                tmp.push(this.renderSquare(20 * i + j));
            }
            table.push(
                <div key={i} className="board-row">
                    {tmp}
                </div>
            );
        }
        return (
            <div>
                {table}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(400).fill(null),
                newMove: null
            }],
            stepNumber: 0,
            colors: Array(400).fill(false),
            xIsNext: true
        };
    }

    isWinBy(current, x, y, vector) {
        var squares = current.squares
        var colors = this.state.colors
        var XO = squares[y * 20 + x]
        if (!XO)
            return
        for (let i = 0; i < 5; i++) {
            let sx = x - i * vector[0]
            let sy = y - i * vector[1]
            let flat = true
            for (let j = 0; j < 5; j++) {
                let X = sx + j * vector[0]
                let Y = sy + j * vector[1]
                if (X >= 20 || Y >= 20 || X < 0 || Y < 0 || squares[Y * 20 + X] !== XO) {
                    flat = false
                    break
                }
            }
            if (flat === true) {
                var OX = null
                if (XO === "O") {
                    OX = "X"
                } else if (XO === "X") {
                    OX = "O"
                }
                if (squares[(sy - vector[1]) * 20 + sx - vector[0]] !== OX || squares[(sy + 5 * vector[1]) * 20 + sx + 5 * vector[0]] !== OX) {
                    for (let j = 0; j < 5; j++) {
                        let X = sx + j * vector[0]
                        let Y = sy + j * vector[1]
                        colors[Y * 20 + X] = true
                    }
                    return XO
                }
            }
        }
        return null
    }
    
    
    calculateWinner(current) {
        var i = current.newMove
        var x = i % 20
        var y = Math.floor(i / 20)
        var vector = [[1, 0], [0, 1], [1, 1], [1, -1]]
    
        for (let i = 0; i < 4; i++) {
            var XO = this.isWinBy(current, x, y, vector[i])
            if (XO)
                return XO
        }
        return null
    }

    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1];
        const squares = current.squares.slice()

        if (this.calculateWinner(current, i) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                newMove: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
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
                newMove: null
            }],
            stepNumber: 0,
            colors: Array(400).fill(false),
            xIsNext: true
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current);
    
        const moves = history.map((step, move) => {
            //console.log(history)
            console.log(step, move)
            const desc = move ? ('Go to move #' + move) : 'Go to game start';
            const cname = (move === this.state.stepNumber) ? "selected" : ""
            return (
                <li key={move}>
                    <button className={cname} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        colors={this.state.colors}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <button onClick={this.replay.bind(this)}>
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