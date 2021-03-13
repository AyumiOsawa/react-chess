import './Board.css';
import Row from '../Row/Row';
import constants from '../../shared/constants';

export default function Board({board}) {
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
  const rowIndeces = Array.from(Array(rowNum).keys()) // generate [0, 1, 2... (rowNum - 1)]
  const cellStyles = `height: ${cellSize}px;
                      width: ${cellSize}px; `;

  console.log(board)
  return (
    <div
      className="board"
    >
    test
      {
        board.map((row, index) => {
          return (
            <Row
              key={index}
              rowNum={rowNum}
            />
          );
        })

      }
    </div>
  );
}
