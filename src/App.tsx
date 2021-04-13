import { useState } from 'react'
import { FaGreaterThan } from 'react-icons/fa'
import { BiRadioCircleMarked } from 'react-icons/bi'

import { InfoBar } from './InfoBar'
import { Header } from './Header'
import { breadthFirstSearch } from './search-algos'
import './App.css'
import { sleep } from './utils'

const ROWS = 28
const COLS = 66

function buildMatrix() {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null))
}

function App() {
  const [matrix, setMatrix] = useState(buildMatrix)
  const [pressed, setPressed] = useState(false)
  const [start, setStart] = useState([12, 10])
  const [target, setTarget] = useState([15, 30])
  const [startPressed, setStartPressed] = useState(false)
  const [targetPressed, setTargetPressed] = useState(false)
  // const [solution, setSolution] = useState<null | any[]>(null)
  const [explored, setExplored] = useState<any[]>([])
  const [algo, setAlgo] = useState(1)

  const handleMouseMove = (i: any, j: any) => {
    if (startPressed && start[0] !== target[0] && start[1] !== target[1]) {
      setStart([i, j])
    }
    if (targetPressed) {
      setTarget([i, j])
    }
    if (pressed) {
      if (
        matrix[i][j] ||
        (start[0] === i && start[1] === j) ||
        (target[0] === i && target[1] === j)
      )
        return

      setMatrix((prevMatrix) => {
        const newMatrix = prevMatrix.map((row, rowIdx) =>
          row.map((col, colIdx) => (rowIdx === i && colIdx === j) || col)
        )
        return newMatrix
      })
    }
  }

  const handleMouseDown = (event: any, i: any, j: any) => {
    if (start[0] === i && start[1] === j) {
      event.stopPropagation()
      setStartPressed(true)
    }
    if (target[0] === i && target[1] === j) {
      event.stopPropagation()
      setTargetPressed(true)
    }
  }

  const handleMouseUp = (event: any, i: any, j: any) => {
    if (startPressed) {
      event.stopPropagation()
      setStart([i, j])
      setStartPressed(false)
      setMatrix((prevMatrix) => {
        const newMatrix = prevMatrix.map((row, rowIdx) =>
          row.map((col, colIdx) =>
            rowIdx === start[0] && colIdx === start[1] ? false : col
          )
        )
        return newMatrix
      })
    }
    if (target[0] === i && target[1] === j) {
      event.stopPropagation()
      setTarget([i, j])
      setTargetPressed(false)
      setMatrix((prevMatrix) => {
        const newMatrix = prevMatrix.map((row, rowIdx) =>
          row.map((col, colIdx) =>
            rowIdx === target[0] && colIdx === target[1] ? false : col
          )
        )
        return newMatrix
      })
    }
  }

  // const isPathNode = (i: any, j: any) => {
  //   return solution && solution.find(([r, c]) => r === i && c === j)
  // }

  // const isExploredNode = (i: any, j: any) => {
  //   return explored.find(([r, c]) => r === i && c === j)
  // }

  const matrixElement = matrix.map((arr, i) => {
    const row = arr.map((_, j) => {
      if (matrix[i][j] === '#') {
        console.log(true)
      }
      return (
        <div
          key={j + i}
          onMouseMove={() => handleMouseMove(i, j)}
          onMouseDown={(event) => handleMouseDown(event, i, j)}
          onMouseUp={(event) => handleMouseUp(event, i, j)}
          id={`${j + 1 + i * COLS}`}
          className={`cell ${matrix[i][j] === true ? 'wall' : ''} ${
            matrix[i][j] === '#' ? 'path' : ''
          } ${matrix[i][j] === '$' ? 'explored' : ''}`}
        >
          {matrix[i][j] === '$' ? (
            <span className="explored-brick"></span>
          ) : null}
          {i === start[0] && j === start[1] ? (
            <FaGreaterThan
              style={{ fontSize: startPressed ? '0.5rem' : '1rem' }}
            />
          ) : null}
          {i === target[0] && j === target[1] ? (
            <BiRadioCircleMarked
              style={{ fontSize: targetPressed ? '0.7rem' : '2rem' }}
            />
          ) : null}
        </div>
      )
    })

    return (
      <div key={i} className="row">
        {row}
      </div>
    )
  })

  async function animateSolution(solution: any) {
    for (let [r, c] of solution) {
      setMatrix((prevMatrix) => {
        return prevMatrix.map((row, rowIdx) => {
          if (rowIdx === r) {
            return row.map((col, colIdx) => {
              if (colIdx === c) {
                return '#'
              } else {
                return col
              }
            })
          } else {
            return [...row]
          }
        })
      })
      await sleep(5)
    }
  }

  async function animateExplore(solution: any) {
    for (let [r, c] of solution) {
      setMatrix((prevMatrix) => {
        return prevMatrix.map((row, rowIdx) => {
          if (rowIdx === r) {
            return row.map((col, colIdx) => {
              if (colIdx === c) {
                return '$'
              } else {
                return col
              }
            })
          } else {
            return [...row]
          }
        })
      })
      await sleep(5)
    }
  }

  async function handleBreadthFirstSearch() {
    const { explored, solution } = breadthFirstSearch(
      matrix,
      start,
      target,
      algo
    )
    console.log(explored)
    // setSolution(solution)
    // setExplored(explored)
    await animateExplore(explored)
    await animateSolution(solution)
  }

  function handleClearBoard() {
    setMatrix(buildMatrix())
    setExplored([])
    // setSolution(null)
  }

  return (
    <div>
      <Header
        setAlgo={setAlgo}
        startBreadthFirstSearch={handleBreadthFirstSearch}
        clearBoard={handleClearBoard}
      />
      <InfoBar />
      <div
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        className="container"
      >
        {matrixElement}
      </div>
    </div>
  )
}

export default App
