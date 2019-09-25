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

    isWin = function (table, x, y) {
        var red = this.state.red.slice
        for (let i = 0; i < 5; i++) {
            let lengthX = 0, lengthY = 0, lengthXY = 0, lengthYX = 0

            for (let j = i; j > i - 5; j--) {
                if (x + j >= 0 && x + j < 20) {
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
            }
            // ngang 1
            if (lengthX === 5 && (table[y * 20 + x + i - 5] !== "O" || table[y * 20 + x + i + 1] !== "O")) {
                red[y * 20 + x + i - 4] = true
                red[y * 20 + x + i - 3] = true
                red[y * 20 + x + i - 2] = true
                red[y * 20 + x + i - 1] = true
                red[y * 20 + x + i] = true
                this.setState({
                    red: red
                })
                return "X"
            }
            //ngang 2
            if (lengthX === -5 && (table[y * 20 + x + i - 5] !== "X" || table[y * 20 + x + i + 1] !== "X")) {
                red[y * 20 + x + i - 4] = true
                red[y * 20 + x + i - 3] = true
                red[y * 20 + x + i - 2] = true
                red[y * 20 + x + i - 1] = true
                red[y * 20 + x + i] = true
                this.setState({
                    red: red
                })
                return "O"
            }
            if (lengthY === 5 && (table[(y + i - 5) * 20 + x] !== "O" || table[(y + i + 1) * 20 + x] !== "O")) {
                red[(y + i - 4) * 20 + x] = true
                red[(y + i - 3) * 20 + x] = true
                red[(y + i - 2) * 20 + x] = true
                red[(y + i - 1) * 20 + x] = true
                red[(y + i) * 20 + x] = true
                this.setState({
                    red: red
                })
                return "X"
            }
            if (lengthY === -5 && (table[(y + i - 5) * 20 + x] !== "X" || table[(y + i + 1) * 20 + x] !== "X")) {
                red[(y + i - 5) * 20 + x + i - 5] = true
                red[(y + i + 1) * 20 + x + i + 1] = true
                this.setState({
                    red: red
                })
                return "O"
            }
            if (lengthXY === 5 && (table[(y + i - 5) * 20 + x + i - 5] !== "O" || table[(y + i + 1) * 20 + x + i + 1] !== "O")) {
                red[(y + i - 4) * 20 + x + i - 4] = true
                red[(y + i - 3) * 20 + x + i - 3] = true
                red[(y + i - 2) * 20 + x + i - 2] = true
                red[(y + i - 1) * 20 + x + i - 1] = true
                red[(y + i) * 20 + x + i] = true
                this.setState({
                    red: red
                })
                return "X"
            }
            if (lengthXY === -5 && (table[(y + i - 5) * 20 + x + i - 5] !== "X" || table[(y + i + 1) * 20 + x + i + 1] !== "X")) {
                red[(y + i - 4) * 20 + x + i - 4] = true
                red[(y + i - 3) * 20 + x + i - 3] = true
                red[(y + i - 2) * 20 + x + i - 2] = true
                red[(y + i - 1) * 20 + x + i - 1] = true
                red[(y + i) * 20 + x + i] = true
                this.setState({
                    red: red
                })
                return "O"
            }
            if (lengthYX === 5 && (table[(y - i + 5) * 20 + x + i - 5] !== "O" || table[(y - i - 1) * 20 + x + i + 1] !== "O")) {
                red[(y - i + 4) * 20 + x + i - 4] = true
                red[(y - i + 3) * 20 + x + i - 3] = true
                red[(y - i + 2) * 20 + x + i - 2] = true
                red[(y - i + 1) * 20 + x + i - 1] = true
                red[(y - i) * 20 + x + i] = true
                
                this.setState({
                    red: red
                })
                return "X"
            }
            if (lengthYX === -5 && (table[(y - i + 5) * 20 + x + i - 5] !== "X" || table[(y - i - 1) * 20 + x + i + 1] !== "X")) {
                red[(y - i + 4) * 20 + x + i - 4] = true
                red[(y - i + 3) * 20 + x + i - 3] = true
                red[(y - i + 2) * 20 + x + i - 2] = true
                red[(y - i + 1) * 20 + x + i - 1] = true
                red[(y - i) * 20 + x + i] = true

                this.setState({
                    red: red
                })
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