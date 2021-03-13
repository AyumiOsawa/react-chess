import './Cell.css';

export default function Cell({cellNum, rowNum}) {
  return (
    <div
      id={`cell-${rowNum}-${cellNum}`}
      className='cell'
    >
     "cell!"
    </div>
  )
}
