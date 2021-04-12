interface Props {
  clearBoard: () => void
  startBreadthFirstSearch: () => void
}

export function Header({ clearBoard, startBreadthFirstSearch }: Props) {
  return (
    <div className="header">
      <h1 className="header__item header__heading">Pathfinding Visualizer</h1>
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
