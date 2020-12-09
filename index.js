'use strict';
const boardSize = [8, 8];
const numbreOfPieces = 8;
const pieceInfo = [{
    name: 'king',
    /*src: 'https://drive.google.com/file/d/1vPExzSfeNICvxiO0mpyZIkJLf8KtsFfZ/view?usp=sharing'*/
  },
  {
    name: 'queen',
    /*src: 'https://drive.google.com/file/d/1OaMSOFRD6GS46NkFRI8m4_nv8Y1Y2hic/view?usp=sharing'*/
  },
  {
    name: 'pawn',
    /*src: 'https://drive.google.com/file/d/1aOJ-gL8udNy6hwa0LOjtzKDloyXIugbZ/view?usp=sharing'*/
  },
  {
    name: 'knight',
    /*src: 'https://drive.google.com/file/d/1eW5sTUwYAmb-lmZLsLiNP_gtGvj3DzqM/view?usp=sharing'*/
  },
  {
    name: 'bishop',
    /*src: 'https://drive.google.com/file/d/1yCmtRhacGCNnc3TlKlWs_bVSZzhYM960/view?usp=sharing'*/
  },
  {
    name: 'rook',
    /*src: 'https://drive.google.com/file/d/1DdhQ67npjIfEnDY7aGO90j9IZXl76LtX/view?usp=sharing'*/
  }
];
const locations = [];
for (let row = 0; row < boardSize[0]; row++) {
  locations.push([]);
  for (let column = 0; column < boardSize[1]; column++) {
    locations[row].push([]);
  };
};

console.log('locations',locations);


const routePredictionKing = (id) => {
  const king = document.getElementById(id);

}

document.addEventListener('DOMContentLoaded', () => {
  // create cells;
  // const boardArray = [];
  const board = document.getElementById('board');
  const viewportWidth = Math.max(document.documentElement.clientWidth ||
    0, window.innerWidth ||
    0);
  const viewportHeight = Math.max(document.documentElement.clientHeight ||
    0, window.innerHeight ||
    0);
  const boardWidth = viewportWidth * 0.8;
  const boardHeight = viewportHeight * 0.8;
  const cellSize = Math.min(boardWidth / 8, boardHeight / 8);
  const centerX = viewportWidth / 2;
  const centerY = viewportHeight / 2;

  for (let rowIndex = 0; rowIndex < boardSize[0]; rowIndex++) {
    // boardArray.push([]);
    const row = document.createElement('DIV');
    row.classList.add = `row${rowIndex}`;
    row.id = `row${rowIndex}`;

    for (let columnIndex = 0; columnIndex < boardSize[1]; columnIndex++) {
      const cell = document.createElement('DIV');
      cell.classList.add("cell");
      cell.style.height = `${cellSize}px`;
      cell.style.width = `${cellSize}px`;
      cell.style.left = `${centerX + cellSize * (columnIndex - 4)}px`;
      cell.style.top = `${centerY + cellSize * (rowIndex - 4)}px`;

      if (rowIndex % 2 === columnIndex % 2) {
        cell.classList.add("black");
      } else {
        cell.classList.add("white");
      }
      cell.id = `cell${rowIndex}-${columnIndex}`;
      // boardArray[rowIndex].push(cell);
      row.appendChild(cell);
    };
    board.appendChild(row) // mounting for debugging purpose
  };

  // add pieces
  const pieces = [];
  const left = centerX - cellSize * 4;
  const bottom = centerY - cellSize * 4;

  for (let index = 0; index < numbreOfPieces; index++) {
    const piece = document.createElement('DIV');

    piece.classList.add(pieceInfo[index % pieceInfo.length].name);
    piece.classList.add('piece');
    piece.style.height = `${cellSize}px`;
    piece.style.width = `${cellSize}px`;
    piece.style.left = `${left + index % numbreOfPieces * cellSize}px`;
    piece.style.top = `${bottom + (Math.floor(index / boardSize[0]) + 1) * cellSize}px`;
    pieces.push(piece);

    const row = Math.floor(index / numbreOfPieces)
    const column = index % numbreOfPieces
    const cell = document.getElementById(`cell${row}-${column}`);

    cell.appendChild(piece);

    // store the location information
    // console.log('boardArray',boardArray);
  };

  // add route prediction
  // switch (piece) {
  //   case 'king':
  //       return
  //     break;
  //   case 'king':
  //
  //     break;
  //   case 'queen':
  //
  //     break;
  //   case 'pawn':
  //
  //     break;
  //   case 'knight':
  //
  //     break;
  //   case 'bishop':
  //
  //     break;
  //   case 'rook':
  //
  //     break;
  //   default:
  // }

});
