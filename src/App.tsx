import React, { Component } from "react";
import "./App.css";
import { Item, calculateWinner } from "./utils";

interface SquareProps {
  value: Item;
  onClick: () => void;
}

const Square = (props: SquareProps) => {
  return (
    <button onClick={props.onClick} className="square">
      {props.value}
    </button>
  );
};

interface BoardProps {
  onClick: (i: number) => void;
  squares: Item[];
}

const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

interface GameProps {}

interface GameState {
  history: { squares: Item[] }[];
  xIsNext: boolean;
  stepNumber: number;
}

class Game extends Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);

    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || current.squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      xIsNext: !this.state.xIsNext,
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status: string;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    const moves = history.map((step, idx) => {
      const desc = idx ? `Go to move #${idx}` : "Go to game start";

      return (
        <li key={idx}>
          <button onClick={() => this.jumpTo(idx)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i: number) => this.handleClick(i)}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
