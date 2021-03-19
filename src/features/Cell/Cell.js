import './Cell.css';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectBoard,
  select,
  unselect,
  move
} from '../Board/BoardSlice';
import constants from '../../shared/constants';

export default function Cell(props) {
  const {
          rowNum,
          colNum,
          bgColor,
          ...rest
        } = props;
  let cellStyles = {...rest.cellStyles};
  const dispatch = useDispatch();

  const board = useSelector(selectBoard);
  const piece = board[rowNum][colNum].piece;
  const pieceInfoCollection = constants.PIECES.info;
  if (piece !== null) {
    const pieceInfo = pieceInfoCollection.filter(info => info.name === piece);
    cellStyles.backgroundImage = `url(${pieceInfo[0].img})`;
    cellStyles.backgroundSize = 'contain';
  }

  const isSelected = board[rowNum][colNum].selected;
  const cellClassNames = isSelected ?
                         `cell ${bgColor} selected` :
                         `cell ${bgColor}`
  return (
    <div
      id={`cell-${colNum}-${rowNum}`}
      className={cellClassNames}
      style={cellStyles}
      onClick={
        isSelected ?
        () => dispatch(unselect({colNum, rowNum})) :
        () => dispatch(select({colNum, rowNum}))
      }
    >
    </div>
  )
}
