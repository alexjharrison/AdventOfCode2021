import run from "aocrunner"

const part1 = (input: string) => {
  const nums = input.split(",").map(Number)
  const min = Math.min(...nums)
  const max = Math.max(...nums)

  let maxFuelSum = Infinity
  for (let i = min; i <= max; i++) {
    const fuelSum = nums.reduce((sum, num) => sum + Math.abs(i - num), 0)
    maxFuelSum = Math.min(maxFuelSum, fuelSum)
  }
  return maxFuelSum
}

const part2 = (input: string) => {
  const nums = input.split(",").map(Number)
  const min = Math.min(...nums)
  const max = Math.max(...nums)

  let maxFuelSum = Infinity
  for (let point = min; point <= max; point++) {
    const fuelSum = nums.reduce((sum, initialLocation) => {
      const distance = Math.abs(point - initialLocation)
      return sum + (distance ** 2 + distance) / 2
    }, 0)
    maxFuelSum = Math.min(maxFuelSum, fuelSum)
  }
  return maxFuelSum
}

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
})
