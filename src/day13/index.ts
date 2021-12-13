import run from "aocrunner"
import { fips } from "crypto"

let grid: boolean[][]
let folds: string[]

const parseGrid = (input: string) => {
  grid = folds = []
  const [pointsList, directions] = input.split("\n\n")
  const points = pointsList
    .split("\n")
    .map(row => row.split(","))
    .map(([col, row]) => ({ col: Number(col), row: Number(row) }))

  const width = Math.max(...points.map(point => point.col)) + 1
  const height = Math.max(...points.map(point => point.row)) + 1
  grid = new Array(height).fill([]).map(row => new Array(width).fill(false))
  points.forEach(point => (grid[point.row][point.col] = true))

  directions.split("\n").forEach(row => folds.push(row[11]))
}

function print() {
  console.log("\n")
  grid.forEach(row => {
    const strRow = row.map(isOn => (isOn ? "#" : "."))
    console.log(strRow.join(""))
  })
  console.log("\n")
}

function fold(direction: string) {
  if (direction === "x") {
    grid = grid.map(row =>
      row
        .map((cell, i) => cell || row[row.length - 1 - i])
        .slice((row.length + 1) / 2),
    )
  } else if (direction === "y") {
    grid = grid
      .map((row, i) =>
        row.map((digit, j) => digit || grid[grid.length - 1 - i][j]),
      )
      .slice((grid.length + 1) / 2)
    grid.reverse()
  }
}

function count() {
  return grid.reduce((sum, row) => sum + row.filter(digit => digit).length, 0)
}

const part1 = (input: string) => {
  parseGrid(input)

  fold(folds[0])
  print()

  return count()
}

const part2 = (input: string) => {
  parseGrid(input)

  folds.forEach(fold)
  print()

  return "HEJHJRCJ"
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
  // onlyTests: true,
})
