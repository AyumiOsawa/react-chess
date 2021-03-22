import { createSlice } from '@reduxjs/toolkit';

import constants from '../../shared/constants';

const pieces = constants.PIECES.info;

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
   new SetCell(rowNum - 1,             0, pieces[5].name),
   new SetCell(rowNum - 1, columnNum - 1, pieces[5].name),
    // knights: next to rooks
   new SetCell(rowNum - 1,             1, pieces[3].name),
   new SetCell(rowNum - 1, columnNum - 2, pieces[3].name),
    // bishop: next to knights
   new SetCell(rowNum - 1,             2, pieces[4].name),
   new SetCell(rowNum - 1, columnNum - 3, pieces[4].name),
    // queen: next to one of the bishops, on the cell with the same color
    // In this case, next to the right bishop
   new SetCell(rowNum - 1, columnNum - 4, pieces[1].name),
    // king: between the queen and another bishop
   new SetCell(rowNum - 1,             3, pieces[0].name)
  ];
  // pawn: all the cells in the next row
  for(let col = 0; col < columnNum; col++) {
    pieceLocations.push(new SetCell(rowNum - 2, col, pieces[2].name));
  }
  return pieceLocations;
};

const createInitialBoard = (initialSelectedCell) => {
  const colNum = constants.BOARD.size[0];
  const rowNum    = constants.BOARD.size[1];
  const initialCellState = {
                             piece: null,
                             isOnPath: false
                           };
  const initialRowState   = Array.from({length: colNum}, () => ({...initialCellState}));
  const initialBoardState = Array.from({length: rowNum   }, () => {
    return initialRowState.map(cell => Object.assign({}, cell));
  });
  const pieceLocations = setUpBoard(rowNum, colNum);
  pieceLocations.forEach(cell => {
    initialBoardState[cell.row][cell.column].piece = cell.piece;
  })
  return initialBoardState;
};

const calculatePath = (piece, colNum, rowNum) => {
  let paths = [];
  switch (piece) {
    case pieces[0].name /* === king */:
    //  TODO: add patterns
      break;
    case pieces[1].name /* ===  queen */:

      break;
    case pieces[2].name /* === pawn */:
      // one cell or two cells front
      paths.push({
        row: rowNum - 1,
        col: colNum
      },
      {
        row: rowNum - 2,
        col: colNum
      });
      break;
    case pieces[3].name /* === knight */:

      break;
    case pieces[4].name /* === bishop */:

      break;
    case pieces[5].name /* === rook */:

      break;
    default:
      break;
  }
  return paths;
}

const initialStateBoard    = createInitialBoard();
const initialStateSelected = {
                                isSelected: false,
                                row: null,
                                column: null
                              };
const initialState = {
  cells    : initialStateBoard,
  selected : initialStateSelected
};
const initialStateSelected = {
                                isSelected: false,
                                row: null,
                                column: null
                              };
const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    move: (state, action) => {
      const {colNum, rowNum} = action.payload;
      state.cells[rowNum][colNum].piece = null;
    },
    colorPath: (state, action) => {
      // check if the piece is on the current cells
      const {colNum, rowNum} = action.payload;
      const piece = state.cells[rowNum][colNum].piece;
      if (piece === null) {
        return state;
      }
      // depending on the piece, calculate which cell to color
      const paths = calculatePath(piece, colNum, rowNum);
      // state update
      paths.forEach(cell => {
        state.cells[cell.row][cell.col].isOnPath = !state.cells[cell.row][cell.col].isOnPath;
      })
    },
    selectCell: (state, action) => {
      const {colNum, rowNum} = action.payload;
      // re-selection of the same cell cancells the seceltion
      if (state.selected.column === colNum && state.selected.row === rowNum) {
        state.selected.isSelected  = initialStateSelected.isSelected;
        state.selected.row         = initialStateSelected.row;
        state.selected.column      = initialStateSelected.column;
      } else {
        state.selected.isSelected  = true;
        state.selected.row         = rowNum;
        state.selected.column      = colNum;
      }
    }
  }
});

export const {
  move,
  colorPath,
  selectCell,
} = BoardSlice.actions;

export const selectBoard = state => state.board;

export default BoardSlice.reducer;
