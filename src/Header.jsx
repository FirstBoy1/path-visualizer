import { AlgoSelector } from './AlgoSelector'

export function Header({
  clearBoard,
  startBreadthFirstSearch,
  setAlgo,
  setSpeed,
}) {
  return (
    <div className="header">
      <h1 className="header__item header__heading">Pathfinding Visualizer</h1>
      <AlgoSelector
        setAlgo={(...args) => {
          clearBoard()
          setAlgo(...args)
        }}
      />
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
      <div className="header__item">
        <select>
          <option onClick={() => setSpeed(1)} defaultValue value="1">
            Fast
          </option>
          <option onClick={() => setSpeed(2)} value="2">
            Slow
          </option>
        </select>
      </div>
    </div>
  )
}
