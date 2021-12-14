import run from "aocrunner"

const dict: { [key: string]: string[] } = {
  CH: ["CB", "BH"],
  HH: ["HN", "NH"],
  CB: ["CH", "HB"],
  NH: ["NC", "CH"],
  HB: ["HC", "CB"],
  HC: ["HB", "BC"],
  HN: ["HC", "CN"],
  NN: ["NC", "CN"],
  BH: ["BH", "HH"],
  NC: ["NB", "BC"],
  NB: ["NB", "BB"],
  BN: ["BB", "BN"],
  BB: ["BN", "NB"],
  BC: ["BB", "BC"],
  CC: ["CN", "NC"],
  CN: ["CC", "CN"],
}
const createHash = (): { [key: string]: number } => ({
  CH: 0,
  HH: 0,
  CB: 0,
  NH: 0,
  HB: 0,
  HC: 0,
  HN: 0,
  NN: 0,
  BH: 0,
  NC: 0,
  NB: 0,
  BN: 0,
  BB: 0,
  BC: 0,
  CC: 0,
  CN: 0,
})
const exampleHash = createHash()
type Hash = typeof exampleHash

const incHashFromString = (str: string, hash: Hash) => {
  for (let i = 0; i < str.length - 1; i++) {
    hash[str[i] + str[i + 1]]++
  }
  return hash
}

function insert(hash: Hash): Hash {
  const hashCopy = { ...hash }
  for (const [key, value] of Object.entries(hashCopy)) {
    const newAdds = dict[key]
    newAdds.forEach(incKey => {
      hash[incKey] += value
    })
    hash[key] -= value
  }
  return hash
}

function difference(hash: Hash): number {
  const letterValues = ["H", "B", "C", "N"].reduce(
    (acc, letter) => {
      // ?
      return acc
    },
    {
      H: 0,
      B: 0,
      C: 0,
      N: 0,
    },
  )

  console.log(letterValues)

  const max = Math.max(...Object.values(letterValues))
  const min = Math.min(...Object.values(letterValues))

  return max - min
}

const part1 = (input: string) => {
  let hash = createHash()
  hash = incHashFromString(input, hash)
  for (let i = 0; i < 10; i++) {
    hash = insert(hash)
  }

  return difference(hash)
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
