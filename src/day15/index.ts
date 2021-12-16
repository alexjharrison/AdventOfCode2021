import run from "aocrunner"
import Graph from "node-dijkstra"

type Node = {
  name: string
  value?: number
  neighbors: { [key: string]: number }
}

let grid: number[][] = []

function mapNodes(): Node[] {
  const nodes: Node[] = []

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let nodeId = `${col}-${row}`
      let node: Node = { name: nodeId, value: grid[col][row], neighbors: {} }

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const neighborNodeId = `${col + i}-${row + j}`
          const neighborValue = grid[col + i]?.[row + j]

          if (Math.abs(i) !== Math.abs(j) && neighborValue !== undefined) {
            node.neighbors[neighborNodeId] = neighborValue
            nodes.push(node)
          }
        }
      }
    }
  }
  return nodes
}

function solve(): number {
  const nodes = mapNodes()
  const graph = new Graph()

  nodes.forEach(node => {
    graph.addNode(node.name, node.neighbors)
  })
  const route: string[] = graph
    .path(`0-0`, `${grid.length - 1}-${grid[0].length - 1}`)
    .slice(1)

  // console.log(route.map(point => nodes.find(node => node.name === point)))

  // console.log(route)

  return route.reduce(
    (sum, point) => sum + (nodes.find(node => node.name === point)?.value || 0),
    0,
  )
}

const part1 = (input: string) => {
  grid = input.split("\n").map(row => row.split("").map(Number))
  return solve()
}

const part2 = (input: string) => {
  const rows = input.split("\n")
  const bigWidth = rows.length * 5

  for (let row = 0; row < bigWidth; row++) {
    grid[row] = []

    for (let col = 0; col < bigWidth; col++) {
      let sum = 0
      sum += Number(rows[row % rows.length][col % rows.length])
      sum += Math.floor(row / rows.length)
      sum += Math.floor(col / rows.length)
      let bonus = Math.floor(sum / 10)
      sum %= 10
      grid[row][col] = sum + bonus
    }
  }
  return solve()
}

const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

run({
  part1: {
    tests: [
      {
        input,
        expected: 40,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 315,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
