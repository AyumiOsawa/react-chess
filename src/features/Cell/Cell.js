import './Cell.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectBoard } from '../Board/BoardSlice';

export default function Cell({
                                rowNum,
                                colNum,
                                cellStyles,
                                bgColor
                              }) {
  // TODO: Load the state and put the pieces
  const board = selectBoard();
  const piece = board[rowNum][colNum].piece;
  if (piece !== null) {
    cellStyles.backgroundImage = `../../img/${piece.toString()}+.png`;
  }

  return (
    <div
      id={`cell-${colNum}-${rowNum}`}
      className={`cell ${bgColor}`}
      style={cellStyles}
    >
    </div>
  )
}
