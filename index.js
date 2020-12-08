'use strict';

const boardSize = [8, 8];

document.addEventListener('DOMContentLoaded', () => {
  // create cells;
  const boardArray = [];
  const board = document.getElementById('board');
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const boardWidth = viewportWidth * 0.8;
  const boardHeight = viewportHeight * 0.8;
  const cellSize = Math.min(boardWidth / 8, boardHeight / 8);
  const centerX = viewportWidth / 2;
  const centerY = viewportHeight / 2;

  for (let rowIndex = 0; rowIndex < boardSize[0]; rowIndex++) {
    boardArray.push([]);
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
      cell.id = `cell${columnIndex}`;
      boardArray[rowIndex].push(cell);
      row.appendChild(cell);
    };
    board.appendChild(row);
  };
});
