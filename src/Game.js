import React from 'react';
import './Game.css'
import './App.css';

class Square extends React.Component {
    render() {
        var name = "square " + (this.props.red ? "win" : "")
        return (
            <button className={name} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(400).fill(null),
            red: Array(400).fill(false),
            xIsNext: true,
            winer: null
        }
    }
    renderSquare(i) {
        return <Square
            red = {this.state.red[i]}
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    isWinBy(table, x, y, vector) {
        var red = this.state.red
        var XO = table[y * 20 + x]
        for (let i = 0; i < 5; i++) {
            let sx = x - i * vector[0]
            let sy = y - i * vector[1]
            let flat = true
            for (let j = 0; j < 5; j++) {
                let X = sx + j * vector[0]
                let Y = sy + j * vector[1]
                if (X >= 20 || Y >= 20 || X < 0 || Y < 0 || table[Y * 20 + X] !== XO) {
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
                if (table[(sy - vector[1]) * 20 + sx - vector[0]] !== OX || table[(sy + 5 * vector[1]) * 20 + sx + 5 * vector[0]] !== OX) {
                    for (let j = 0; j < 5; j++) {
                        let X = sx + j * vector[0]
                        let Y = sy + j * vector[1]
                        red[Y * 20 + X] = true
                    }
                    return XO
                }
            }
        }
        return null
    }

    isWin(table, x, y) {
        var vector = [[1, 0], [0, 1], [1, 1], [1, -1]]

        for (let i = 0; i < 4; i++) {
            var XO = this.isWinBy(table, x, y, vector[i])
            if (XO)
                return XO
        }
        return null
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (squares[i] || this.state.winer)
            return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
        switch (this.isWin(squares, i % 20, Math.floor(i / 20))) {
            case "X":
                this.setState({
                    xIsNext: null,
                    winer: "X"
                })
                break;
            case "O":
                this.setState({
                    xIsNext: null,
                    winer: "O"
                })
                break;
            default:
                break;
        }
    }

    render() {
        let status;
        if (this.state.xIsNext == null) {
            status = this.state.winer + " wins"
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
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
                <div className="status">{status}</div>
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
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    refreshPage() {
        window.location.reload(false);
    }

    render() {
        return (
            <header className="App-header">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>
                        <button className="reset" onClick={this.refreshPage.bind(this)}>
                            Chơi lại
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}

export default Game;