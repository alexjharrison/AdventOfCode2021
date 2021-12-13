import run from "aocrunner"

let grid: boolean[][] = []
const xFolds: number[] = []
const yFolds: number[] = []

const parseGrid = (input: string) => {
  const [pointsList, directions] = input.split("\n\n")
  const points = pointsList
    .split("\n")
    .map(row => row.split(","))
    .map(([col, row]) => ({ col: Number(col), row: Number(row) }))

  const width = Math.max(...points.map(point => point.col)) + 1
  const height = Math.max(...points.map(point => point.row)) + 1
  grid = new Array(height).fill([]).map(row => new Array(width).fill(false))
  points.forEach(point => (grid[point.row][point.col] = true))

  const directionRows = directions
    .replaceAll("fold along ", "")
    .split("\n")
    .map(row => row.split("="))
    .forEach(([letter, value]) => {
      if (letter === "x") xFolds.push(Number(value))
      else if (letter === "y") yFolds.push(Number(value))
    })
  console.log({ xFolds, yFolds })

  print()
}

function print() {
  grid.forEach(row => {
    const strRow = row.map(isOn => (isOn ? "#" : "."))
    console.log(strRow.join(""))
  })
}

const part1 = (input: string) => {
  parseGrid(input)
  return
}

const part2 = (input: string) => {
  parseGrid(input)
  return
}

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

run({
  part1: {
    tests: [{ input, expected: 17 }],
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
