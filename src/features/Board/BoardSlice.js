import { createSlice } from '@reduxjs/toolkit';

import constants from '../../shared/constants';

// const initialSelectedCell = {
//                               row   : null,
//                               column: null,
//                               piece : null
//                             };
const setUpBoard = (columnNum, rowNum) => {
  const setCell = (row, column, piece) => {
    return {
      row: row,
      col: column,
      piece: piece
    };
  };
  const pieceLocations = [
    // rook: at the corners
    setCell(rowNum - 1,             0, 'rook'),
    setCell(rowNum - 1, columnNum - 1, 'rook'),
    // knights: next to rooks
    setCell(rowNum - 1,             1, 'knight'),
    setCell(rowNum - 1, columnNum - 2, 'knight'),
    // bishop: next to knights
    setCell(rowNum - 1,             2, 'bishop'),
    setCell(rowNum - 1, columnNum - 3, 'bishop'),
    // queen: next to one of the bishops, on the cell with the same color
    // In this case, next to the right bishop
    setCell(rowNum - 1, columnNum - 4, 'queen'),
    // king: between the queen and another bishop
    setCell(rowNum - 1,             3, 'king')
  ];
  // pawn: all the cells in the next row
  for(let col = 0; col < columnNum; col++) {
    pieceLocations.push(setCell(rowNum - 2, col, 'pawn'));
  }
  return pieceLocations;
};

const createInitialBoard = (initialSelectedCell) => {
  const columnNum = constants.BOARD.size[0];
  const rowNum    = constants.BOARD.size[1];
  const initialCellState = {
                             piece    : null,
                             selected : false
                           };
  const initialRowState   = Array(columnNum).fill(initialCellState);
  const initialBoardState = Array(rowNum).fill(initialRowState);
  const pieceLocations = setUpBoard(rowNum, columnNum);
  pieceLocations.forEach(cell => {
    initialBoardState[cell.row][cell.col].piece = cell.piece;
  })
  return initialBoardState;
};

const initialState = {
  board: createInitialBoard()
};

// TODO: think about where to save the info about the selected cell and piece

const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    select: (state, action) => {
      const [column, row] = action.payload;
      state[row][column].selected = true;
    },
    move: (state, action) => {
      const [column, row] = action.payload;
      state[row][column].piece = null;
    },
    unselect: (state, action) => {
      const [column, row] = action.payload;
      state[row][column].selected = false;
    }
  }
});
