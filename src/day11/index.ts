import run from "aocrunner"

type CbFunc = (col: number, row: number) => void

let rows: number[][] = []
let bursts = 0

function printGrid(): void {
  rows.forEach(row => console.log(row.join("")))
  console.log("\n--------------------\n")
}

function gridLoop(
  steps: number,
  cb: CbFunc,
  loopCleanupCb?: (step: number) => boolean,
): number | void {
  for (let step = 0; step < steps; step++) {
    for (let row = 0; row < rows.length; row++) {
      for (let col = 0; col < rows[row].length; col++) {
        cb(row, col)
      }
    }
    const shouldStop = loopCleanupCb && loopCleanupCb(step)
    if (shouldStop) return step + 1
  }
}

function increaseSelf(row: number, col: number): void {
  const digit = rows[row]?.[col]
  // out of bounds or already burst this loop
  if (digit === undefined || digit < 0) return
  // 0 through 8
  else if (digit < 9) {
    rows[row][col]++
  }
  // boom goes the squid
  else if (digit === 9) {
    rows[row][col] = -1
    increaseNeighbors(row, col)
  }
}

function increaseNeighbors(row: number, col: number): void {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      increaseSelf(row + i, col + j)
    }
  }
}

function countBursts(): void {
  gridLoop(1, (row, col) => {
    if (rows[row][col] === -1) {
      rows[row][col]++
      bursts++
    }
  })
}

const part1 = (input: string) => {
  rows = input.split("\n").map(row => row.split("").map(Number))
  const loops = 100
  bursts = 0
  gridLoop(loops, increaseSelf, () => {
    countBursts()
    // printGrid()
    return false
  })
  return bursts
}

const part2 = (input: string) => {
  rows = input.split("\n").map(row => row.split("").map(Number))
  const loops = Infinity
  bursts = 0
  return gridLoop(loops, increaseSelf, step => {
    countBursts()

    let points = 0
    gridLoop(1, (col, row) => {
      points += rows[col][row]
    })
    if (points === 0) {
      printGrid()
      return true
    }
    return false
  })
}

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

run({
  part1: {
    // tests: [{ input, expected: 1656 }],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 195 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
