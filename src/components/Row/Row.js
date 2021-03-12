import './Row.css';
import Cell from '../Cell/Cell';

export default function Row({boardX}) {
  return (
    <div
      className="board"
    >
    {
      <Cell />
    }
    </div>
  );
}
