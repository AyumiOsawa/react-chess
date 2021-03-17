import './Row.css';
import Cell from '../Cell/Cell';
import constants from '../../shared/constants';

export default function Row({ rowNum, cellSize, boardLeft, cellStyles }) {
  const columnNum = constants.BOARD.size[0];

  return (
    <div
      id={`row-${rowNum}`}
      className='row'
    >
    {
      Array(columnNum).fill(null).map((cell, index) => {
        return (
          <Cell
            key={index}
            colNum={index}
            rowNum={rowNum}
            bgColor={
              rowNum % 2 === index % 2 ?
              'white' :
              'black'
            }
            cellStyles={
              Object.assign({}, cellStyles, {
                left: `${boardLeft + cellSize * index}px`
              })
            }
          />
        );
      })
    }
    </div>
  );
}
