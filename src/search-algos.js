class Node {
  constructor(state, parent, action) {
    this.state = state
    this.parent = parent
    this.action = action
  }
}

class StackFrontier {
  constructor() {
    this.frontier = []
  }

  add(node) {
    this.frontier.push(node)
  }

  containsState(state) {
    return !!this.frontier.find(
      (n) => n.state[0] === state[0] && n.state[1] === state[1]
    )
  }

  empty() {
    return !this.frontier.length
  }

  remove() {
    if (this.empty()) throw new Error('Empty frontier')

    return this.frontier.pop()
  }
}

class QueueFrontier extends StackFrontier {
  remove() {
    if (this.empty()) throw new Error('Empty frontier')

    return this.frontier.shift()
  }
}

function neighbors(state, matrix, width, height) {
  const [row, col] = state
  const candidates = [
    ['up', [row - 1, col]],
    ['down', [row + 1, col]],
    ['left', [row, col - 1]],
    ['right', [row, col + 1]],
  ]

  const result = []
  for (const [action, [r, c]] of candidates) {
    if (r >= 0 && r < height && c >= 0 && c < width && !matrix[r][c]) {
      result.push([action, [r, c]])
    }
  }

  return result
}

// function getWalls(matrix) {
//   const walls = []
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[0].length; j++) {
//       if (matrix[i][j]) walls.push([i, j])
//     }
//   }
//   return walls
// }

export function breadthFirstSearch(matrix, start, target, algo) {
  const height = matrix.length
  const width = matrix[0].length
  // const walls = getWalls(matrix)
  const explored = []
  let solution = null

  let frontier
  if (algo === 1) {
    frontier = new QueueFrontier()
  } else if (algo === 2) {
    frontier = new StackFrontier()
  }

  frontier.add(new Node(start, null, null))

  while (!frontier.empty()) {
    let node = frontier.remove()

    if (node.state[0] === target[0] && node.state[1] === target[1]) {
      const cells = []
      while (node.parent) {
        cells.push(node.state)
        node = node.parent
      }
      cells.push(start)
      cells.reverse()
      solution = cells
      break
    }

    explored.push(node.state)

    for (const [action, state] of neighbors(
      node.state,
      matrix,
      width,
      height
    )) {
      if (
        frontier.containsState(state) ||
        !!explored.find((s) => s[0] === state[0] && s[1] === state[1])
      )
        continue
      const child = new Node(state, node, action)
      frontier.add(child)
    }
  }

  return { explored, solution }
}
