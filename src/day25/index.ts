import run from "aocrunner"

let grid: string[][] = []

function parseInput(input: string) {
  grid = input.split("\n").map(line => line.split(""))
}

function moveRight() {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const nextStep = (col + 1) % grid[row].length
      const nextNextStep = (nextStep + 1) % grid[row].length

      if (grid[row][col] === ">" && grid[row][nextStep] === ".") {
        if (col === grid[row].length - 1 && grid[row][nextNextStep] !== ">") {
          grid[row][col] = "."
          grid[row][nextStep] = ">"
        } else {
          grid[row][col] = "."
          grid[row][nextStep] = ">"
          col++
        }
      }
    }
  }
}

function moveDown() {
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 0; row < grid.length; row++) {
      const nextStep = (row + 1) % grid.length
      const nextNextStep = (nextStep + 1) % grid.length

      if (grid[row][col] === "v" && grid[nextStep][col] === ".") {
        if (col === grid.length - 1 && grid[nextNextStep][col] !== "v") {
          grid[row][col] = "."
          grid[nextStep][col] = "v"
        } else {
          grid[row][col] = "."
          grid[nextStep][col] = "v"
          row++
        }
      }
    }
  }
}

function singleLoop() {
  moveRight()
  moveDown()
}

function print() {
  grid.forEach(line => {
    console.log(line.join(""))
  })
  console.log("")
}

const part1 = (input: string) => {
  parseInput(input)
  print()
  singleLoop()
  print()
  singleLoop()
  print()
  singleLoop()
  print()
  return
}

const part2 = (input: string) => {
  parseInput(input)
  return
}

const input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`

run({
  part1: {
    tests: [
      { input, expected: 58 },
      //       { input:`v.........
      // ..........
      // ..........
      // ..........
      // ..........
      // ..........
      // ..........
      // ..........
      // ..........`, expected: 58 },
    ],
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
