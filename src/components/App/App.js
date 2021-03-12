import { useState } from 'react';

import './App.css';
import Board from '../Board/Board';
import constants from '../../shared/constants';

export default function App() {
  const boardX = constants.BOARD.size[0];
  const boardY = constants.BOARD.size[1];
  const initialBoardState = Array.from(Array(boardY), row => {
    row = Array(boardX)
  });
  console.log('initialBoardState',initialBoardState);
  const [ board, setBoard ] = useState(new Array())
  // const locations = [];
  // for (let index = 0; index < boardX; index++) {
  //   locations.push(Array(boardY));
  // };
  const viewportWidth  = Math.max(document.documentElement.clientWidth || 0,
                                  window.innerWidth || 0);
  const viewportHeight = Math.max(document.documentElement.clientHeight || 0,
                                  window.innerHeight || 0);
  const boardWidth  = viewportWidth  * 0.8;
  const boardHeight = viewportHeight * 0.8;

  const cellSize = Math.min(boardWidth / boardX, boardHeight / boardY);
  const boardLeft = viewportWidth  / 2 - cellSize * (boardX / 2);
  const boardTop  = viewportHeight / 2 - cellSize * (boardY / 2);

  // TODO: dynamically render the components
  // const generateBoardAndPieces = (
  //                                   boardX,
  //                                   boardY,
  //                                   boardLeft,
  //                                   boardTop
  //                                ) => {
  //   const board = [];
  //   for (let rowIndex = 0; rowIndex < boardX; rowIndex++) {
  //     const row = document.createElement('DIV');
  //     row.classList.add(`row${rowIndex}`);
  //     row.id = `row${rowIndex}`;
  //     for (let columnIndex = 0; columnIndex < boardY; columnIndex++) {
  //       const cell = document.createElement('DIV');
  //       cell.classList.add("cell");
  //       cell.id           = `cell${rowIndex}-${columnIndex}`;
  //       cell.style.height = `${cellSize}px`;
  //       cell.style.width  = `${cellSize}px`;
  //       cell.style.left   = `${boardLeft + cellSize * columnIndex}px`;
  //       cell.style.top    = `${boardTop  + cellSize * rowIndex}px`;
  //
  //       if (rowIndex % 2 === columnIndex % 2) {
  //         cell.classList.add("black");
  //       } else {
  //         cell.classList.add("white");
  //       };
  //       const numbreOfPieces = constants.PIECE.number;
  //       if (numbreOfPieces < (rowIndex + 1) * (columnIndex + 1)) {
  //         // create pieces
  //         const piece = document.createElement('DIV');
  //         const pieceInfo = constants.PIECE.info;
  //         const pieceName = pieceInfo[columnIndex % pieceInfo.length].name;
  //         piece.classList.add(pieceName);
  //         piece.classList.add('piece');
  //         piece.id           = `${pieceName}-
  //                               ${Math.floor(numbreOfPieces / pieceInfo.length)}`
  //         piece.style.height = `${cellSize}px`;
  //         piece.style.width  = `${cellSize}px`;
  //         piece.style.left   = `${boardLeft + columnIndex % numbreOfPieces * cellSize}
  //                               px`;
  //         piece.style.top    = `${boardTop + (rowIndex + 1) * cellSize}px`;
  //         cell.appendChild(piece);
  //         locations[rowIndex][columnIndex] = {
  //                                              piece: pieceName,
  //                                              selected: false
  //                                            };
  //       }
  //       row.appendChild(cell);
  //     }
  //     // const board = document.getElementById('board');
  //     board.push(row) // mounting for debugging purpose
  //   }
  //   return board;
  // }


  return (
    <div className="App">
      <div className="base">
        <div
          id="board"
          className="board"
        >
          <Board
            boardX='boardX'
            boardY='boardY'
          />
        </div>
    </div>
    </div>
  );
}
