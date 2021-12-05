import run from "aocrunner"

const part1 = (input: string) => {
  const rows = input.split("\n")

  let bin = ""
  for (let i = 0; i < 12; i++) {
    let sum = 0
    for (const row of rows) {
      const digit = row[i]
      digit === "1" ? sum++ : sum--
    }
    bin += sum > 0 ? "1" : "0"
  }

  const eps = bin
    .split("")
    .map((num) => (num === "1" ? "0" : "1"))
    .join("")

  const gamma = parseInt(bin, 2)
  const epsilon = parseInt(eps, 2)
  return gamma * epsilon
}

const part2 = (input: string) => {
  type Line = {
    binary: string[]
    original: string
    decimal: number
  }

  const o2: Line[] = input.split("\n").map((binary, i) => ({
    decimal: parseInt(binary, 2),
    binary: binary.split(""),
    original: binary,
  }))
  const co2: Line[] = input.split("\n").map((binary, i) => ({
    decimal: parseInt(binary, 2),
    binary: binary.split(""),
    original: binary,
  }))

  const o2Rating = mostCommon(o2)
  const co2Rating = mostCommon(co2, false)
  console.log({ o2Rating, co2Rating })

  return o2Rating * co2Rating

  function mostCommon(lines: Line[], preferHigh = true): number {
    const num = lines.reduce((count, line) => {
      return count + (line.binary[0] === "1" ? 1 : -1)
    }, 0)

    let filter = ""
    if (num > 0) {
      filter = preferHigh ? "1" : "0"
    } else if (num < 0) {
      filter = preferHigh ? "0" : "1"
    } else if (num === 0) {
      filter = preferHigh ? "1" : "0"
    }

    let newlines = lines.filter((line) => line.binary[0] === filter)

    newlines = circumcize(newlines)

    if (newlines.length === 1) {
      return newlines[0].decimal
    }

    if (newlines.length === 0) {
      throw new Error("HALP")
    }

    return mostCommon(newlines, preferHigh)
  }

  function circumcize(lines: Line[]) {
    return lines.map((line) => ({
      decimal: line.decimal,
      binary: line.binary.slice(1),
      original: line.original,
    }))
  }
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
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
