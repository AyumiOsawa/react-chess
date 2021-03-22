import './Cell.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectBoard, move, colorPath, selectCell } from '../Board/BoardSlice';

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
  const piece = board.cells[rowNum][colNum].piece;
  const pieceInfoCollection = constants.PIECES.info;
  if (piece !== null) {
    const pieceInfo = pieceInfoCollection.filter(info => info.name === piece);
    cellStyles.backgroundImage = `url(${pieceInfo[0].img})`;
    cellStyles.backgroundSize = 'contain';
  }
  // set the background color, if it is selected
  const checkIsSelected = (colNum, rowNum) => {
    if (board.selected.column === colNum && board.selected.row === rowNum) {
      return board.selected.isSelected;
    }
    return false;
  };
  const checkIsOnPath = (colNum, rowNum) => {
    return board.cells[rowNum][colNum].isOnPath;
  };
  const getClassNames = (colNum, rowNum) => {
    // TODO:
    //  if the cell it selected, it should be colored
    let cellClassNames = checkIsSelected(colNum, rowNum) ?
                           `cell ${bgColor} selected` :
                           `cell ${bgColor}`;
    //  if the cell is on the path, it should be colored
     if(checkIsOnPath(colNum, rowNum)) {
      cellClassNames = cellClassNames + ' path';
     }
    return cellClassNames;
  }

  return (
    <div
      id={`cell-${colNum}-${rowNum}`}
      className={getClassNames(colNum, rowNum)}
      style={cellStyles}
      onClick={() => {
        dispatch(selectCell({colNum, rowNum}));
        dispatch(colorPath({colNum, rowNum}));
      }}
    >
    </div>
  )
}
