import { FaGreaterThan } from 'react-icons/fa'
import { BiRadioCircleMarked } from 'react-icons/bi'

export function InfoBar() {
  return (
    <div className="info-bar">
      <div className="item">
        <FaGreaterThan />
        <span className="text">Start Node</span>
      </div>
      <div className="item">
        <BiRadioCircleMarked style={{ fontSize: '1.5rem' }} />
        <span className="text">Target Node</span>
      </div>
      <div className="item">
        <span className="item__box item__unvisited-box"></span>
        <span className="text">Unvisited Node</span>
      </div>
      <div className="item">
        <span className="item__box item__visited-box-1"></span>
        <span className="item__box item__visited-box-2"></span>
        <span className="text">Unvisited Node</span>
      </div>
      <div className="item">
        <span className="item__box item__shortest-box"></span>
        <span className="text">Shortest-path Node</span>
      </div>
      <div className="item">
        <span className="item__box item__wall-box"></span>
        <span className="text">Wall Node</span>
      </div>
    </div>
  )
}
