import React from 'react';
import {Board} from './game-components';
import {ToggleButtonOnOff} from './ui-components';
import {calculateWinner} from './game-functions';
import GlobalStyle from './styles';

export class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
            index: -1,
          }],
          stepNumber: 0,
          xIsNext: true,
          historyOrder: 'ASC',
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
          return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
            index: i
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
    }

    changeHistoryOrder() {
        this.setState({
          historyOrder: this.state.historyOrder === 'ASC' ? 'DESC' : 'ASC',
        });
    }

    render() {
        const order = this.state.historyOrder;
        const history = (order === 'ASC') ? this.state.history : [...this.state.history].reverse();
        const current = this.state.history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const index = step.index;
            const row = Math.floor(index/3)+1;
            const col = index +1 - ((row-1)*3);
            const listIndex = (order === 'ASC') ? move : history.length - move -1;
            const description = index > -1 ?
              'Ir a #' + listIndex + ' (' + row + ';' + col + ')':
              'Reiniciar';
            const style = this.state.stepNumber === listIndex ? 'last-move' : '';
            return (
              <li key={index}>
                <button onClick={() => this.jumpTo(listIndex)}
                    className={style}>{description}</button>
              </li>
            );
          });

        let status;
        if (winner) {
            status = 'Ganador: ' + winner;
        } else if(this.state.stepNumber === 9) {
            status = 'Empate!';
        } else {
            status = 'Próximo: ' + (this.state.xIsNext ? 'X' : 'O');
        }

    
        return (
            
            <div className="game">
                <GlobalStyle />
                <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><ToggleButtonOnOff selected={this.state.historyOrder === 'ASC' ? true : false} onClick={() => this.changeHistoryOrder()} /></div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
  }