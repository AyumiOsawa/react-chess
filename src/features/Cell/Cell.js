import './Cell.css';

export default function Cell({ cellNum, cellStyles, bgColor }) {
  // TODO: Load the state and put the pieces
  return (
    <div
      id={`cell-${cellNum}`}
      className={`cell ${bgColor}`}
      style={cellStyles}
    >
    </div>
  )
}
