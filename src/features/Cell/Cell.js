import './Cell.css';

export default function Cell({ cellNum, cellStyles, bgColor }) {
  return (
    <div
      id={`cell-${cellNum}`}
      className={`cell ${bgColor}`}
      style={cellStyles}
    >
    </div>
  )
}
