import './Cell.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectBoard, move } from '../Board/BoardSlice';
import { selectSelected, selectCell } from '../Cell/CellSlice';

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

  // Set the piece, if there is one
  const board = useSelector(selectBoard);
  const piece = board[rowNum][colNum].piece;
  const pieceInfoCollection = constants.PIECES.info;
  if (piece !== null) {
    const pieceInfo = pieceInfoCollection.filter(info => info.name === piece);
    cellStyles.backgroundImage = `url(${pieceInfo[0].img})`;
    cellStyles.backgroundSize = 'contain';
  }

  // set the background color, if it is selected
  const selectedCell = useSelector(selectSelected);
  const isSelected = (colNum, rowNum) => {
    if (selectedCell.column === colNum && selectedCell.row === rowNum) {
      return selectedCell.isSelected;
    }
    return false;
  }
  const cellClassNames = isSelected(colNum, rowNum) ?
                         `cell ${bgColor} selected` :
                         `cell ${bgColor}`
  //  TODO: debug the styling issue
  console.log('cellClassNames',cellClassNames);
  return (
    <div
      id={`cell-${colNum}-${rowNum}`}
      className={cellClassNames}
      style={cellStyles}
      onClick={() => {
        return dispatch(selectCell({colNum, rowNum}));
      }}
    >
    </div>
  )
}
