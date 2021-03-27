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

const boardSize = constants.BOARD.size;
const colSize = boardSize[0];
const rowSize = boardSize[1];
const validateLocation = (num, isRow) => {
  if (isRow) {  // validate the row location
    return num >= 0 && num < rowSize;
  }
  // validate the column location
  return num >= 0 && num < colSize;
};

const getCellsOnDiagonalPath = (rowNum, colNum) => {
  const leftTop    = colNum > rowNum ?
                     [0               , colNum - rowNum] :
                     [rowNum - colNum , 0              ];
  const leftBottom = colNum + rowNum >= rowSize - 1 ?
                     [rowSize - 1     , colNum - (rowSize - 1 - rowNum)] :
                     [rowNum + colNum , 0                              ];
  const startPoints = [{
                        start    : leftTop,
                        increment: [ 1,  1]
                      },
                      {
                        start    : leftBottom,
                        increment: [-1,  1]
                      }];
  const cellsToAdd = [];
  startPoints.forEach(info => {
    const {start, increment} = info
    let currentLocation = [...start];
    while(validateLocation(currentLocation[0], true)  &&
          validateLocation(currentLocation[1], false)    ) {
      if (currentLocation[0] !== rowNum &&
          currentLocation[1] !== colNum) {
            cellsToAdd.push([
              currentLocation[0],
              currentLocation[1]
            ]);
          }
      currentLocation = [
                          (currentLocation[0] + increment[0]),
                          (currentLocation[1] + increment[1]),
                        ]
    }
  });
  return cellsToAdd;
};

const getCellsOnCrossroadsPath = (rowNum, colNum) => {
  const boardColIndex = Array.from({length: boardSize[0]}, (value, index) => index);
  const boardRowIndex = Array.from({length: boardSize[1]}, (value, index) => index);
  const cellsToAdd = []
  boardColIndex.forEach(colIndex => {
    if(colNum !== colIndex) {
      cellsToAdd.push([rowNum, colIndex]);
    }
  });
  boardRowIndex.forEach(rowIndex => {
    if (rowNum !== rowIndex) {
      cellsToAdd.push([rowIndex, colNum]);
    }
  });
  return cellsToAdd;
};

const checkCellVacancy = (rowNum, colNum, state) => {
  if (state.cells[rowNum][colNum].piece === null) {
    return true;
  }
  return false;
};

const calculatePath = (piece, colNum, rowNum, state) => {
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
        if ( validateLocation(row, true)       &&
             validateLocation(col, false)      &&
             checkCellVacancy(row, col, state)    ) {
              paths.push({
                row: row,
                col: col
              });
        }
      });
      break;
    case pieces[1].name /* ===  queen */:
      let cellsOnDiagonalPath = getCellsOnDiagonalPath(rowNum, colNum);
      const cellsToAddToQueensPath = cellsOnDiagonalPath.concat(
                                      getCellsOnCrossroadsPath(rowNum, colNum)
                                     );
      cellsToAddToQueensPath.forEach(cell => {
        if (checkCellVacancy(cell[0], cell[1], state)) {
          paths.push({
            row: cell[0],
            col: cell[1]
          });
        }
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
        if (checkCellVacancy(row, col, state)) {
          paths.push({
            row: row,
            col: col
          });
        } else {
          break;
        }
      }
      // paths.push({
      //   row: rowNum - 1,
      //   col: colNum
      // },
      // {
      //   row: rowNum - 2,
      //   col: colNum
      // });
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
        if ( validateLocation(row, true)        &&
             validateLocation(col, false)       &&
             checkCellVacancy(row, col, state)    ) {
               paths.push({
                 row: row,
                 col: col
               })
        }
      })
      break;
    case pieces[4].name /* === bishop */:
      const cellsToAddToBishosPath = getCellsOnDiagonalPath(rowNum, colNum);
      cellsToAddToBishosPath.forEach(cell => {
        if (checkCellVacancy(cell[0], cell[1], state)) {
          paths.push({
            row: cell[0],
            col: cell[1]
          });
        }
      });
      break;
    case pieces[5].name /* === rook */:
      const cellsToAddToRooksPath = getCellsOnCrossroadsPath(rowNum, colNum);
      cellsToAddToRooksPath.forEach(cell => {
        if (checkCellVacancy(cell[0], cell[1], state)) {
          paths.push({
            row: cell[0],
            col: cell[1]
          })
        }
      })
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

const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    move: (state, action) => {
      const {colNum, rowNum} = action.payload;
      state.cells[rowNum][colNum].piece = null;
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
      // apply the styling to the cells on the path of the currently selected piece
      // const cellsWithLocations = state.cells.map((row, rowIndex) => {
      //   return row.map((cell, colIndex) => {
      //             cell.row = rowIndex;
      //             cell.col = colIndex;
      //             return cell;
      //           })
      // });
      // const flattened = cellsWithLocations.flat(2);
      // const occupiedCells = flattened.filter(cell => cell.piece !== null);
      // console.log('occupiedCells',occupiedCells);
      const paths = calculatePath(piece, colNum, rowNum, state);
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
