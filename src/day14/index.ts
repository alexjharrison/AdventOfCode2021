import run from "aocrunner"

type Hash = { [key: string]: number }
type Dict = { [key: string]: string[] }

let dict: Dict
let hash: Hash
let word: string

const createDict = (input: string) => {
  const [str, rules] = input.split("\n\n")
  word = str
  const lines = rules.split("\n").map(rule => rule.split(" -> "))

  dict = lines.reduce(
    (obj, [input, output]) => ({
      ...obj,
      [input]: [input[0] + output, output + input[1]],
    }),
    {},
  )

  hash = lines.reduce((obj, [input]) => ({ ...obj, [input]: 0 }), {})
}

const incHashFromString = () => {
  for (let i = 0; i < word.length - 1; i++) {
    hash[word[i] + word[i + 1]]++
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

function difference(): number {
  const letterValues: Hash = [
    ...new Set(Object.keys(dict).map(combo => combo[0])),
  ].reduce((obj, letter) => ({ ...obj, [letter]: 0 }), {})

  for (const [key, val] of Object.entries(hash)) {
    letterValues[key[0]] += val
    letterValues[key[1]] += val
  }

  letterValues[word[0]]++
  letterValues[word[word.length - 1]]++

  for (const [key, val] of Object.entries(letterValues)) {
    letterValues[key] = val / 2
  }

  const max = Math.max(...Object.values(letterValues))
  const min = Math.min(...Object.values(letterValues))

  return max - min
}

const part1 = (input: string) => {
  createDict(input)

  hash = incHashFromString()
  for (let i = 0; i < 10; i++) {
    hash = insert(hash)
  }

  return difference()
}

const part2 = (input: string) => {
  createDict(input)

  hash = incHashFromString()
  for (let i = 0; i < 40; i++) {
    hash = insert(hash)
  }

  return difference()
}

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

run({
  part1: {
    tests: [{ input, expected: 1588 }],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 2188189693529 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
