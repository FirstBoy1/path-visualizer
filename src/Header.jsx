import { AlgoSelector } from './AlgoSelector'

export function Header({ clearBoard, startBreadthFirstSearch, setAlgo }) {
  return (
    <div className="header">
      <h1 className="header__item header__heading">Pathfinding Visualizer</h1>
      <AlgoSelector setAlgo={setAlgo} />
      <div className="header__item">
        <button
          onClick={startBreadthFirstSearch}
          className="header__btn header__visualize-btn"
        >
          Visualize!
        </button>
      </div>
      <div className="header__item">
        <button className="header__btn" onClick={clearBoard}>
          Clear Board
        </button>
      </div>
    </div>
  )
}
