import './Board.css';
import Row from '../Row/Row';

export default function Board({boardX, boardY}) {
  const numOfRows = boardY;
  // arrangement of the cells
  return (
    <div
      className="board"
    >
    {
      <Row
        boardX={boardX}
      />
    }
    </div>
  );
}
