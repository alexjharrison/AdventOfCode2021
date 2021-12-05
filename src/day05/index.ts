import run from "aocrunner"

type Line = {
  x1: number
  y1: number
  x2: number
  y2: number
}

type Point = {
  x: number
  y: number
}

const parseInput = (input: string): Line[] =>
  input.split("\n").map((line) => {
    const [start, finish] = line.split(" -> ")
    return {
      x1: +start.split(",")[0],
      y1: +start.split(",")[1],
      x2: +finish.split(",")[0],
      y2: +finish.split(",")[1],
    }
  })

const getPoints = (line: Line, diagonals: boolean): Point[] => {
  const xdiff = line.x2 - line.x1
  const ydiff = line.y2 - line.y1
  const newPoints: Point[] = []

  const xdirection = -xdiff / Math.abs(xdiff)
  const ydirection = -ydiff / Math.abs(ydiff)

  // line is diagonal
  if (xdiff !== 0 && ydiff !== 0 && diagonals) {
    for (let i = 0; i <= Math.abs(xdiff); i++) {
      newPoints.push({
        x: line.x2 + xdirection * i,
        y: line.y2 + ydirection * i,
      })
    }
  }
  // line is horizontal
  else if (xdiff !== 0) {
    // -1 or 1 if going up or down
    for (let i = 0; i <= Math.abs(xdiff); i++) {
      newPoints.push({ y: line.y2, x: line.x2 + xdirection * i })
    }
  }
  // line is vertical
  else if (ydiff !== 0) {
    // -1 or 1 if going up or down
    for (let i = 0; i <= Math.abs(ydiff); i++) {
      newPoints.push({ x: line.x2, y: line.y2 + ydirection * i })
    }
  }
  return newPoints
}

const solveIt = (diagonals: boolean, input: string): number => {
  const lines = parseInput(input)
  const largest = lines.reduce(
    (max, line) => Math.max(max, line.x1, line.x2, line.y1, line.y2),
    0,
  )
  const grid: number[][] = Array(largest + 1)
    .fill(null)
    .map((_) => Array(largest + 1).fill(0))

  let bigCount = 0

  lines.forEach((line) => {
    const points = getPoints(line, diagonals)
    points.forEach(({ x, y }) => {
      grid[x][y]++
      if (grid[x][y] === 2) bigCount++
    })
  })
  return bigCount
}

const part1 = (input: string) => solveIt(false, input)

const part2 = (input: string) => solveIt(true, input)

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

run({
  part1: {
    tests: [{ input, expected: 5 }],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 12 }],
    solution: part2,
  },
  trimTestInputs: true,
})
