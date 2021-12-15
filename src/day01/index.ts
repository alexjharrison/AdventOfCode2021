import run from "aocrunner"

const part1 = (input: string) => {
  const depths = input.split("\n").map(Number)

  let count = 0
  for (let i = 0; i < depths.length - 1; i++) {
    if (depths[i + 1] > depths[i]) count++
  }

  return count
}

const part2 = (input: string) => {
  const depths = input.split("\n").map(Number)

  let count = 0
  for (let i = 0; i < depths.length - 3; i++) {
    if (depths[i + 3] > depths[i]) count++
  }

  return count
}

run({
  part1: {
    tests: [
      { input: `2\n3\n4`, expected: 2 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
