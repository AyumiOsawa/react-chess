import { createSlice } from '@reduxjs/toolkit';

import constants from '../../shared/constants';

// const initialSelectedCell = {
//                               row   : null,
//                               column: null,
//                               piece : null
//                             };
const setUpBoard = (columnNum, rowNum) => {
  const SetCell = function(row, column, piece) {
    this.collection = {
      row   : row,
      column: column,
      piece : piece
    };
    return this.collection;
  };
  const pieceLocations = [
    // rook: at the corners
   new SetCell(rowNum - 1,             0, 'rook'),
   new SetCell(rowNum - 1, columnNum - 1, 'rook'),
    // knights: next to rooks
   new SetCell(rowNum - 1,             1, 'knight'),
   new SetCell(rowNum - 1, columnNum - 2, 'knight'),
    // bishop: next to knights
   new SetCell(rowNum - 1,             2, 'bishop'),
   new SetCell(rowNum - 1, columnNum - 3, 'bishop'),
    // queen: next to one of the bishops, on the cell with the same color
    // In this case, next to the right bishop
   new SetCell(rowNum - 1, columnNum - 4, 'queen'),
    // king: between the queen and another bishop
   new SetCell(rowNum - 1,             3, 'king')
  ];
  // pawn: all the cells in the next row
  for(let col = 0; col < columnNum; col++) {
    pieceLocations.push(new SetCell(rowNum - 2, col, 'pawn'));
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
  const initialRowState   = Array.from({length: columnNum}, () => ({...initialCellState}));
  const initialBoardState = Array.from({length: rowNum   }, () => {
    return initialRowState.map(cell => Object.assign({}, cell));
  });
  const pieceLocations = setUpBoard(rowNum, columnNum);
  pieceLocations.forEach(cell => {
    initialBoardState[cell.row][cell.column].piece = cell.piece;
  })

  return initialBoardState;
};

const initialState = createInitialBoard();

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

export const {
  select,
  move,
  unselect
} = BoardSlice.actions;

export const selectBoard = state => state.board;

export default BoardSlice.reducer;
