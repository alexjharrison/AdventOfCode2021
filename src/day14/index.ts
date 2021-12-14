import run from "aocrunner"

const dict: { [key: string]: string } = {
  CH: "B",
  HH: "N",
  CB: "H",
  NH: "C",
  HB: "C",
  HC: "B",
  HN: "C",
  NN: "C",
  BH: "H",
  NC: "B",
  NB: "B",
  BN: "B",
  BB: "N",
  BC: "B",
  CC: "N",
  CN: "C",
}

function insert(str: string): string {
  let newStr = ""
  for (let i = 0; i < str.length - 1; i++) {
    newStr += str[i] + dict[str[i] + str[i + 1]]
  }
  return newStr + str[str.length - 1]
}

const part1 = (input: string) => {
  let newStr = input
  for (let i = 0; i < 10; i++) {
    newStr = insert(newStr)
  }

  return newStr
}

const part2 = (input: string) => {
  return
}

const input = `NNCB`

run({
  part1: {
    tests: [{ input, expected: 1588 }],
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
