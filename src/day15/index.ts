import run from "aocrunner"
import Graph from "node-dijkstra"

type Node = {
  [key: string]: { value?: number; neighbors: { [key: string]: number } }
}

function mapNodes(input: string): Node[] {
  const nodes: Node[] = []
  const grid: number[][] = input
    .split("\n")
    .map(row => row.split("").map(Number))

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let nodeId = `${col}-${row}`
      let node: Node = { [nodeId]: { value: grid[col][row], neighbors: {} } }

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const neighborNodeId = `${col + i}-${row + j}`
          const neighborValue = grid[col + i]?.[row + j]

          if (i !== j && neighborValue !== undefined) {
            node[nodeId].neighbors[neighborNodeId] = neighborValue
            nodes.push(node)
          }
        }
      }
    }
  }
  return nodes
}

const part1 = (input: string) => {
  const nodes = mapNodes(input)
  const route = new Graph()

  nodes.forEach(node => {
    const [name, info] = Object.entries(node)
    console.log(name, info)
    // route.addNode()
  })
  return
}

const part2 = (input: string) => {
  return
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
    tests: [{ input, expected: 40 }],
    solution: part1,
  },
  part2: {
    tests: [
      // { input, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
