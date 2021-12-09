import run from "aocrunner"

const part1 = (input: string) => {
  const grid = input.split("\n").map(row => row.split("").map(Number))

  let risk = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const row = grid[y]
      const val = row[x]

      let isLow = true
      //top
      const above = y === 0 ? Infinity : grid[y - 1][x]
      isLow = isLow && above > val

      //bottom
      const below = y === grid.length - 1 ? Infinity : grid[y + 1][x]
      isLow = isLow && below > val

      //left
      const left = x === 0 ? Infinity : grid[y][x - 1]
      isLow = isLow && left > val

      //right
      const right = x === grid[y].length - 1 ? Infinity : grid[y][x + 1]
      isLow = isLow && right > val

      if (isLow) {
        risk += grid[y][x] + 1
      }
    }
  }
  return risk
}

const part2 = (input: string) => {
  const grid = input.split("\n").map(row => row.split(""))

  const basins: number[] = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const row = grid[y]
      const val = row[x]

      if (val !== "-" && val !== "9") {
        basinBlaster(y, x, basins.length)
        // printGrid()
        // console.log(basins)
      }
    }
  }

  return basins
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((product, num) => product * num, 1)

  function basinBlaster(y: number, x: number, idx: number): void {
    if (!grid[y] || !grid[y][x]) return
    const val = grid[y][x]
    if (val !== "-" && val !== "9") {
      grid[y][x] = "-"

      if (!basins[idx]) basins.push(1)
      else basins[idx]++

      basinBlaster(y - 1, x, idx)
      basinBlaster(y + 1, x, idx)
      basinBlaster(y, x + 1, idx)
      basinBlaster(y, x - 1, idx)
    }
  }

  function printGrid() {
    const lines = grid.join("\n")
    console.log(grid.join("\n")) //.map(line => line.join("")))
    console.log("")
    console.log("--------------")
    console.log("")
  }
}

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`

run({
  part1: {
    // tests: [{ input, expected: 15 }],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 1134 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
