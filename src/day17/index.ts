import run from "aocrunner"

interface TargetBounds {
  x1: number
  x2: number
  y1: number
  y2: number
}

function parseInput(input: string): TargetBounds {
  const [x1, x2, y1, y2] = input
    .replace("target area: x=", "")
    .replace(", y=", "..")
    .split("..")
    .map(Number)
  return { x1, x2, y1, y2 }
}

let targetBounds = { x1: 0, x2: 0, y1: 0, y2: 0 }
let coords = { x: 0, y: 0 }
let highestYVal = -Infinity

function fire(dx: number, dy: number): boolean {
  let currentHighestYValue = -Infinity
  let initialSpeed = { dx, dy }
  coords = { x: 0, y: 0 }

  // Steps in rocket fire
  for (let i = 0; i < 500; i++) {
    coords.x += dx
    coords.y += dy
    currentHighestYValue = Math.max(currentHighestYValue, coords.y)

    const { x, y } = coords
    const { x1, x2, y1, y2 } = targetBounds

    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      highestYVal = Math.max(highestYVal, currentHighestYValue)
      // console.log({ ...initialSpeed, ...coords, max_y: currentHighestYValue })

      return true
    }

    // apply drag and gravity
    dx = Math.sign(dx) * Math.max(0, Math.abs(dx) - 1)
    dy--
  }
  return false
}

const part1 = (input: string) => {
  targetBounds = parseInput(input)
  // fire all the rockets
  for (let dx = -500; dx < 500; dx++) {
    for (let dy = -500; dy < 500; dy++) {
      fire(dx, dy)
    }
  }
  return highestYVal
}

const part2 = (input: string) => {
  targetBounds = parseInput(input)
  let successes = 0

  // fire all the rockets
  for (let dx = -500; dx < 500; dx++) {
    for (let dy = -500; dy < 500; dy++) {
      if (fire(dx, dy)) {
        successes++
      }
    }
  }
  return successes
}

const input = `target area: x=20..30, y=-10..-5`

run({
  part1: {
    tests: [{ input, expected: 45 }],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 112 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
