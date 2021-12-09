import run from "aocrunner"
import { Digit } from "./Digit.js"

const part1 = (input: string) => {
  Digit.counts = 0
  const nums = input.split("\n").map(line => new Digit(line))
  return Digit.counts
}

const part2 = (input: string) => {
  Digit.decodedSum = 0
  const nums = input.split("\n").map(line => new Digit(line))
  return Digit.decodedSum
}

const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

run({
  part1: {
    // tests: [{ input, expected: 26 }],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 61229 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
