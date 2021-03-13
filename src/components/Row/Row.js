import './Row.css';
import Cell from '../Cell/Cell';

export default function Row({boardX, rowNum}) {
  console.log(Array(boardX));
  return (
    <div
      id={`row-${rowNum}`}
      className='row'
    >
    {
      Array(boardX).fill(null).map((cell, index) => {
        return (
          <Cell
            key={index}
            cellNum={index}
            rowNum={rowNum}
          />
        );
      })
    }
    </div>
  );
}
