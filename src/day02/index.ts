import run from "aocrunner"

const part1 = (input: string) => {
  const commands = input.split("\n")
  let horizontal = 0
  let vertical = 0

  for (const command of commands) {
    const [direction, value] = command.split(" ")

    switch (direction) {
      case "forward":
        horizontal += +value
        break
      case "up":
        vertical -= +value
        break
      case "down":
        vertical += +value
    }
  }
  return horizontal * vertical
}

const part2 = (input: string) => {
  const commands = input.split("\n")
  let horizontal = 0
  let vertical = 0
  let aim = 0

  for (const command of commands) {
    const [direction, value] = command.split(" ")

    switch (direction) {
      case "forward":
        horizontal += +value
        vertical += aim * +value
        break
      case "up":
        aim -= +value
        break
      case "down":
        aim += +value
    }
  }
  return horizontal * vertical
}

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
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
