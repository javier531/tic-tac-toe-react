import React from 'react';
import styled from "styled-components";

const StyledSquare = styled.button`
    color: ${props => props.value === "X" ? "green" : "blue"}; 
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 48px;
    font-weight: bold;
    line-height: 48px;
    height: 64px;
    width: 64px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;

    &:focus {
        outline: none;
    }
`;

export function Square(props) {
    return (
        <StyledSquare className="square" onClick={props.onClick} value={props.value}>
            {props.value}
        </StyledSquare>
    );
  }
  


export function Board(props) {

    function renderSquare(i) {
        return <Square value={props.squares[i]}
            onClick={() => props.onClick(i)} />;
    }


    let board = [];
    for (let i=0; i < 3; i++) {
        let items = [];
        for (let j=i*3; j < (i+1)*3; j++) {
            items.push(renderSquare(j));
        }
        board.push(<div className="board-row">{items}</div>);
    }
    
  
    return (
          <div>
            {board}
          </div>
    );
  }