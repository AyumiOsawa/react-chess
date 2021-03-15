import { createSlice } from '@reduxjs/toolkit';

import constants from '../../shared/constants';

const initialSelectedCell = {
                              row   : null,
                              column: null,
                              piece : null
                            };

const createInitialBoard = ( initialSelectedCell ) => {
  const columnNum = constants.BOARD.size[0];
  const rowNum    = constants.BOARD.size[1];
  const initialCellState    = {
                                piece       : null,
                                selected    : false,
                                selectedCell: initialSelectedCell
                              };
  const initialRowState   = Array(columnNum).fill(initialCellState);
  const initialBoardState = Array(rowNum).fill(initialRowState);
  return initialBoardState;
}

const initialState = {
  board: createInitialBoard()
};

const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    select: (state, action) => {
      const [column, row] = action.payload;
      state[row][column].selected = true;
      // keep the selected cell info
      state[row][column].selectedCell = {
        row: row,
        column: column,
        piece: state[row][column].piece

      state[row][column].selectedRow = row;
      state[row][column].selectedCol = column;
      state[row][column].selectedPiece = state[row][column].piece;
    },
    move: (state, action) => {
      const [column, row] = action.payload;
      state[row][column].piece = null;

      // clear the selected cell info
      state[row][column].selectedRow = row;
      state[row][column].selectedCol = column;
      state[row][column].selectedPiece = state[row][column].piece;
    },
    unselect: (state, action) => {
      const [column, row] = action.payload;
      state[row][column].selected = false;
    }
  }
})
