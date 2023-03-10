import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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
    constructor(props){
        super(props);
        this.state = {
            indexes : Array(9).fill(null),
            count : 0,
        };
    }
    handleClick(i){
        var squares = this.state.indexes.slice();
        var cur_count = this.state.count + 1;
        if (this.getWinner()) {
            return;
        }
        if(!squares[i]) {
            squares[i] = (cur_count % 2 ) ?  'O' : 'X';
            this.setState({indexes:squares, count : cur_count});   
        }
    }
    renderSquare(i) {
      return <Square value = {this.state.indexes[i]}
                    onClick ={() => this.handleClick(i)} />;
    }

     getWinner(){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          var temp = this.state.indexes;
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (temp[a] && temp[a] === temp[b] && temp[a] === temp[c]) {
              return temp[a];
            }
          }
          return null;
    }

    render() {
        let status;
        if(this.getWinner()){
            status = 'Winner is ' + this.getWinner();
        } else {
            status = 'Next player is :' + ((this.state.count) ? 'X' : 'O');
        }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
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
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  