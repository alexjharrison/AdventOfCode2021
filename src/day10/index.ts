import run from "aocrunner"

interface Inverse {
  key: string
  points: number
}

const part1 = (input: string) => {
  const inverse: { [key: string]: Inverse } = {
    "(": { key: ")", points: 3 },
    "[": { key: "]", points: 57 },
    "{": { key: "}", points: 1197 },
    "<": { key: ">", points: 25137 },
  }
  const lines = input.split("\n").map(str => str.split(""))
  const points: number[] = []
  let inverseStr: Inverse[] = []
  for (const line of lines) {
    for (const char of line) {
      // add new item to list
      if (inverse[char as keyof Inverse]) {
        inverseStr.push(inverse[char as keyof Inverse])
      }
      // pop last item off list
      else {
        const lastItem = inverseStr[inverseStr.length - 1]
        if (lastItem.key === char) inverseStr.pop()
        else {
          for (const [key, val] of Object.entries(inverse)) {
            if (val.key === char) points.push(val.points)
          }

          break
        }
      }
    }
  }
  return points.reduce((sum, num) => sum + num, 0)
}

const part2 = (input: string) => {
  const inverse: { [key: string]: Inverse } = {
    "(": { key: ")", points: 1 },
    "[": { key: "]", points: 2 },
    "{": { key: "}", points: 3 },
    "<": { key: ">", points: 4 },
  }
  const lines = input.split("\n").map(str => str.split(""))
  const points: number[] = []
  for (const line of lines) {
    let inverseStr: Inverse[] = []
    for (const char of line) {
      // add new item to list
      if (inverse[char as keyof Inverse]) {
        inverseStr.push(inverse[char as keyof Inverse])
      }
      // pop last item off list
      else {
        const lastItem = inverseStr[inverseStr.length - 1]
        if (lastItem.key === char) inverseStr.pop()
        else {
          inverseStr = []
          break
        }
      }
    }
    if (inverseStr.length > 0) {
      points.push(
        inverseStr.reverse().reduce((sum, str) => sum * 5 + str.points, 0),
      )
    }
  }
  return points.sort((a, b) => b - a)[(points.length - 1) / 2]
}

const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

run({
  part1: {
    tests: [{ input, expected: 26397 }],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 288957 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
