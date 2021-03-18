import './Cell.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectBoard } from '../Board/BoardSlice';
import constants from '../../shared/constants';

export default function Cell(props) {
  const {
          rowNum,
          colNum,
          bgColor,
          ...rest
        } = props;
  let cellStyles = {...rest.cellStyles};

  const board = useSelector(selectBoard);
  const piece = board[rowNum][colNum].piece;
  const pieceInfoCollection = constants.PIECES.info;
  if (piece !== null) {
    const pieceInfo = pieceInfoCollection.filter(info => info.name === piece);
    cellStyles.backgroundImage = `url(${pieceInfo[0].img})`;
    cellStyles.backgroundSize = 'contain';
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
