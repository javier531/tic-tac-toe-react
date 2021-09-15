import React from 'react';
import {render, cleanup, act, fireEvent} from '@testing-library/react';
import {Game} from './game';
import {Square, Board} from './game-components';
import { calculateWinner } from './game-functions';

let container = null;

afterEach(cleanup);
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});



it('check a snapshot', () => {
    const { asFragment } = render(<Game />);
    
    expect(asFragment(<Game />)).toMatchSnapshot();
});

it('check Square content should equal to X', () => {
    const square = render(<Square value='X' />); 
    expect(square.container.textContent).toBe('X');
});

it('check Board content', () => {
    let squareArray = Array(9).fill(null);
    squareArray[1] = squareArray[3] ='X';

    const board = render(<Board squares={squareArray} />); 
    const squares = board.getAllByText('X');
    expect(squares.length).toBe(2);
});

it('check Board click event', () => {
    const board = render(<Game />); 
    const squares = board.container.querySelectorAll('button.square');
    const square0 = squares.item(0);
    const square1 = squares.item(1);

    fireEvent.click(square0);
    fireEvent.click(square1);

    //Check first & second click
    expect(square0.textContent).toBe('X');
    expect(square1.textContent).toBe('O');
});

it('check toggle click event', () => {
    const board = render(<Game />); 
    const toggle = board.container.querySelector('button.toggle-button');

    expect(toggle.textContent).toBe('Orden ASC');
    fireEvent.click(toggle);

    //Check after click
    expect(toggle.textContent).toBe('Orden DESC');
});

it('check calculate winner', () => {
    let squares = null;
    const winners = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for(const winner of winners) {
        squares = Array(9).fill(null);
        squares[winner[0]] = 'X';
        squares[winner[1]] = 'X';
        squares[winner[2]] = 'X';
        expect(calculateWinner(squares)).toBe('X');
      }

      squares = Array(9).fill(null);
      squares[0] = 'X';
      squares[1] = 'X';
      squares[2] = 'O';
      expect(calculateWinner(squares)).toBe(null);

});