import React from 'react';
import './Game.css'
import './App.css';

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
            squares: Array(400).fill(null),
            xIsNext: true,
            winer: null
        }
    }
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }
    isWin = function (table, x, y) {
        for (let i = 0; i < 5; i++) {

            let lengthX = 0, lengthY = 0, lengthXY = 0, lengthYX = 0

            for (let j = i; j > i - 5; j--) {
                switch (table[y * 20 + x + j]) {
                    case "X":
                        lengthX++;
                        break;
                    case "O":
                        lengthX--;
                        break;
                    default:
                }
                switch (table[(y + j) * 20 + x]) {
                    case "X":
                        lengthY++;
                        break;
                    case "O":
                        lengthY--;
                        break;
                    default:
                }
                switch (table[(y + j) * 20 + x + j]) {
                    case "X":
                        lengthXY++;
                        break;
                    case "O":
                        lengthXY--;
                        break;
                    default:
                }
                switch (table[(y - j) * 20 + x + j]) {
                    case "X":
                        lengthYX++;
                        break;
                    case "O":
                        lengthYX--;
                        break;
                    default:
                }
            }
            console.log(lengthXY)
            if (lengthX === 5 && (table[y * 20 + x + i - 6] !== "O" || table[y * 20 + x + i + 1] !== "O")) {
                return "X"
            }
            if (lengthX === -5 && (table[y * 20 + x + i - 6] !== "X" || table[y * 20 + x + i + 1] !== "X")) {
                return "O"
            }
            if (lengthY === 5 && (table[(y + i - 6) * 20 + x] !== "O" && table[(y + i + 1) * 20 + x] !== "O")) {
                return "X"
            }
            if (lengthY === -5 && (table[(y + i - 6) * 20 + x] !== "X" && table[(y + i + 1) * 20 + x] !== "X")) {
                return "O"
            }
            if (lengthXY === 5 && (table[(y + i - 6) * 20 + x + i - 6] !== "O" || table[(y + i + 1) * 20 + x + i + 1] !== "O")) {
                return "X"
            }
            if (lengthXY === -5 && (table[(y + i - 6) * 20 + x + i - 6] !== "X" || table[(y + i + 1) * 20 + x + i + 1] !== "X")) {
                return "O"
            }
            if (lengthYX === 5 && (table[(y - i + 6) * 20 + x + i - 6] !== "O" || table[(y - i - 1) * 20 + x + i + 1] !== "O")) {
                return "X"
            }
            if (lengthYX === -5 && (table[(y - i + 6) * 20 + x + i - 6] !== "X" || table[(y - i - 1) * 20 + x + i + 1] !== "X")) {
                return "O"
            }
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