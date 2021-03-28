import './Board.css';
import Cell from '../Cell/Cell';
import constants from '../../shared/constants';

export default function Board() {
  const columnNum = constants.BOARD.size[0];
  const rowNum = constants.BOARD.size[1];
  const viewportWidth  = Math.max(document.documentElement.clientWidth || 0,
                                  window.innerWidth || 0);
  const viewportHeight = Math.max(document.documentElement.clientHeight || 0,
                                  window.innerHeight || 0);
  const boardWidth  = viewportWidth  * 0.8;
  const boardHeight = viewportHeight * 0.8;
  const cellSize = Math.min(boardWidth / columnNum, boardHeight / rowNum);
  const boardLeft = viewportWidth  / 2 - cellSize * (columnNum / 2);
  const boardTop  = viewportHeight / 2 - cellSize * (rowNum / 2);
  let cellStyles = {
                        height: cellSize + 'px',
                        width : cellSize + 'px'
                      };

  return (
    <div
      className="board"
    >
      {
        Array(rowNum).fill(null).map((row, rowIndex) => {
          return (
              <div
                key={rowIndex}
                id={`row-${rowIndex}`}
                className='row'
              >
                  {
                    Array(columnNum).fill(null).map((cell, colIndex) => {
                      return (
                        <Cell
                          key={colIndex}
                          colNum={colIndex}
                          rowNum={rowIndex}
                          bgColor={
                            rowIndex % 2 === colIndex % 2 ?
                            'white' :
                            'black'
                          }
                          cellStyles={
                            Object.assign({}, cellStyles, {
                                top: `${boardTop + cellSize * rowIndex}px`,
                                left: `${boardLeft + cellSize * colIndex}px`
                            })
                          }
                        />
                      );
                    })
                  }
              </div>
          );
        })
      }
    </div>
  );
}

// ----------

//
//
// export default function Row({ rowNum, cellSize, boardLeft, cellStyles }) {
//   const columnNum = constants.BOARD.size[0];
//
//   return (
//     // <div
//     //   id={`row-${rowNum}`}
//     //   className='row'
//     // >
//     {
//       Array(columnNum).fill(null).map((cell, index) => {
//         return (
//           <Cell
//             key={index}
//             colNum={index}
//             rowNum={rowNum}
//             bgColor={
//               rowNum % 2 === index % 2 ?
//               'white' :
//               'black'
//             }
//             cellStyles={
//               Object.assign({}, cellStyles, {
//                 left: `${boardLeft + cellSize * index}px`
//               })
//             }
//           />
//         );
//       })
//     }
//     // </div>
//   );
// }
