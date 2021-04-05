import { createSlice } from '@reduxjs/toolkit';

import constants from '../../shared/constants';
import initialSetUp from '../../data/initialSetUp.json';

const createInitialBoard = (initialSelectedCell) => {
  const colNum = constants.BOARD.size[0];
  const rowNum = constants.BOARD.size[1];
  const initialCellState = {
                             piece: null,
                             isOnPath: false
                           };
  const initialRowState   = Array.from({length: colNum}, () => ({...initialCellState}));
  const initialBoardState = Array.from({length: rowNum}, () => {
    return initialRowState.map(cell => Object.assign({}, cell));
  });
  const pieceLocations = Object.values(initialSetUp);
  pieceLocations.forEach(cell => {
    initialBoardState[cell.row][cell.column].piece = cell.piece;
  })
  return initialBoardState;
};

const isOnBoard = (num, isRow) => {
    if (isRow) {
        // validate the row location
        const rowSize = constants.BOARD.size[0];
        return num >= 0 && num < rowSize;
    }
    // validate the column location
    const colSize = constants.BOARD.size[1];
    return num >= 0 && num < colSize;
};

const getDiagonalPath = (rowNum, colNum, state) => {
    let row, col;
    const leftUp = [];
    for (row = rowNum - 1, col = colNum - 1;
         row >= 0 &&       col >= 0;
         row--,            col--) {
        if (isCellVacant(row, col, state)) {
            leftUp.push([row, col]);
        } else {
            break;
        }
    }
    const rightUp = [];
    for (row = rowNum - 1, col = colNum + 1;
         row >= 0 &&       col < 8;
         row--,            col++) {
        if (isCellVacant(row, col, state)) {
            rightUp.push([row, col]);
        } else {
            break;
        }
    }
    const leftDown = [];
    for (row = rowNum + 1, col = colNum - 1;
         row < 8 &&        col >= 0;
         row++,            col--) {
        if (isCellVacant(row, col, state)) {
            leftDown.push([row, col]);
        } else {
            break;
        }
    }
    const rightDown = [];
    for (row = rowNum + 1, col = colNum + 1;
         row < 8 &&        col < 8;
         row++,            col++) {
        if (isCellVacant(row, col, state)) {
            rightDown.push([row, col]);
        } else {
            break;
        }
    }
    return [
        ...leftUp,
        ...rightUp,
        ...leftDown,
        ...rightDown
    ];
};

const getCrossroadsPath = (rowNum, colNum, state) => {
  const up = [];
  for (let i = rowNum - 1; i >= 0; i--) {
      if (isCellVacant(i, colNum, state)) {
          up.push([i, colNum])
      } else {
          break;
      }
  }
  const down = [];
  for (let i = rowNum + 1; i < 8; i++) {
      if (isCellVacant(i, colNum, state)) {
          down.push([i, colNum])
      } else {
          break;
      }
  }
  const left = [];
  for (let i = colNum - 1; i >= 0; i--) {
      if (isCellVacant(rowNum, i, state)) {
          left.push([rowNum, i])
      } else {
          break;
      }
  }
  const right = [];
  for (let i = colNum + 1; i < 8; i++) {
      if (isCellVacant(rowNum, i, state)) {
          right.push([rowNum, i])
      } else {
          break;
      }
  }
  return [
      ...up,
      ...down,
      ...left,
      ...right
  ];
};

const isCellVacant = (rowNum, colNum, state) => {
  if (state.cells[rowNum][colNum].piece === null) {
    return true;
  }
  return false;
};

const calculatePath = (piece, rowNum, colNum, state) => {
    const pieces = constants.PIECES.info;
    let paths = [];
    switch (piece) {
      case pieces[0].name /* === king */:
        const kingsMoves = [
          [ 0,  1],
          [ 0, -1],
          [ 1,  0],
          [-1,  0],
          [ 1,  1],
          [ 1, -1],
          [-1,  1],
          [-1,  -1]
        ];
        kingsMoves.forEach(move => {
          const row = rowNum + move[0];
          const col = colNum + move[1]
          if ( isOnBoard(row, true)       &&
               isOnBoard(col, false)      &&
               isCellVacant(row, col, state)    ) {
                paths.push({
                  row: row,
                  col: col
                });
          }
        });
        break;
      case pieces[1].name /* ===  queen */:
        const queensPath = [
                              ...getDiagonalPath(rowNum, colNum, state),
                              ...getCrossroadsPath(rowNum, colNum, state)
                          ];
        queensPath.forEach(cell => {
            paths.push({
                row: cell[0],
                col: cell[1]
            });
        });
        break;
      case pieces[2].name /* === pawn */:
        const pawnsMoves = [
          [-1, 0],
          [-2, 0]
        ];
        for (let i = 0; i < pawnsMoves.length; i++) {
          const row = rowNum + pawnsMoves[i][0];
          const col = colNum + pawnsMoves[i][1];
          if (isCellVacant(row, col, state)) {
            paths.push({
              row: row,
              col: col
            });
          } else {
            break;
          }
        }
        break;
      case pieces[3].name /* === knight */:
        const knightsMoves = [
          [ 1,  2],
          [ 1, -2],
          [-1,  2],
          [-1, -2],
          [ 2,  1],
          [ 2, -1],
          [-2,  1],
          [-2, -1],
        ];
        knightsMoves.forEach(move => {
          const row = rowNum + move[0];
          const col = colNum + move[1];
          if ( isOnBoard(row, true)        &&
               isOnBoard(col, false)       &&
               isCellVacant(row, col, state)    ) {
                 paths.push({
                   row: row,
                   col: col
                 })
          }
        })
        break;
      case pieces[4].name /* === bishop */:
        const bishosPath = getDiagonalPath(rowNum, colNum, state);
        bishosPath.forEach(cell => {
            paths.push({
              row: cell[0],
              col: cell[1]
            });
        });
        break;
      case pieces[5].name /* === rook */:
        const rooksPath = getCrossroadsPath(rowNum, colNum, state);
        rooksPath.forEach(cell => {
            paths.push({
              row: cell[0],
              col: cell[1]
            })
        })
        break;
      default:
        break;
    }
    return paths;
};

const initialStateSelected = {
                                isSelected: false,
                                row: null,
                                column: null
                              };
const initialState         = {
                                cells    : createInitialBoard(),
                                selected : initialStateSelected
                             };

const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    move: (state, action) => {
      const {colNum, rowNum} = action.payload;
      const oldRowNum = state.selected.row;
      const oldColNum = state.selected.column;
      const movingPiece = state.cells[oldRowNum][oldColNum].piece;
      console.log('movingPiece',movingPiece);

      // remove the color on the paths
      const paths = calculatePath(movingPiece, oldRowNum, oldColNum, state);
      paths.forEach(cell => {
        state.cells[cell.row][cell.col].isOnPath = false;
      });
      // remove the piece from the old cell
      state.cells[state.selected.row][state.selected.column].piece = null;
      // set the piece in the new cell
      state.cells[rowNum][colNum].piece = movingPiece;

      // reset the state.selected
      state.selected = initialStateSelected;
    },
    colorPath: (state, action) => {
      const {colNum, rowNum} = action.payload;
      const piece = state.cells[rowNum][colNum].piece;
      // reset the isOnPath state
      state.cells.forEach(row => {
        row.forEach(cell => {
          cell.isOnPath = false
        })
      })
      if (piece === null || !state.selected.isSelected ) {
        return state;
      }
      const paths = calculatePath(piece, rowNum, colNum, state);
      paths.forEach(cell => {
        state.cells[cell.row][cell.col].isOnPath = true;
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
  selectCell,
  colorPath
} = BoardSlice.actions;

export const selectBoard = state => state.board;

export default BoardSlice.reducer;
