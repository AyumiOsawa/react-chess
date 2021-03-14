import './Board.css';
import Row from '../Row/Row';
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
        Array(rowNum).fill(null).map((row, index) => {
          return (
            <Row
              key={index}
              rowNum={index}
              cellSize={cellSize}
              boardLeft={boardLeft}
              cellStyles={
                Object.assign({}, cellStyles, {
                    top: `${boardTop + cellSize * index}px`
                  })
              }
            />
          );
        })

      }
    </div>
  );
}
