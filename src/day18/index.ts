import run from "aocrunner"

type Tuple = [number, number]
type PossibleTuple = [number | Tuple, number | Tuple]

let data: PossibleTuple[] = []

const part1 = (input: string) => {
  data = input.split("\n").map(line => JSON.parse(line))
  console.log(data)
  return
}

const part2 = (input: string) => {
  return
}

const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`

run({
  part1: {
    tests: [
      {
        input,
        expected:
          "[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]",
      },
    ],
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
