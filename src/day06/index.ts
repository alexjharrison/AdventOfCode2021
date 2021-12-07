import run from "aocrunner"

const part1 = (input: string) => {
  // let fish = input.split(",").join("")
  // let newborns = ""
  // for (let i = 0; i < 80; i++) {
  //   const fishLength = fish.length
  //   for (let j = 0; j < fishLength; j++) {
  //     let newTime = +fish[j] - 1
  //     if (newTime < 0) {
  //       newborns += "8"
  //       newTime = 6
  //     }
  //     fish = fish.slice(0, j) + String(newTime) + fish.slice(j + 1)
  //   }
  //   fish += newborns
  //   newborns = ""
  // }
  // return fish.length
  return 2
}

const part2 = (input: string) => {
  const nums = input.split(",").map(Number)

  const hash = [...Array(9)].map((_, i) => nums.filter(num => num === i).length)

  for (let i = 0; i < 256; i++) {
    const zeroVal = hash.shift()
    if (zeroVal !== undefined) {
      hash.push(zeroVal)
      hash[6] += zeroVal
    }
  }

  return hash.reduce((sum, num) => sum + num, 0)
}

run({
  part1: {
    // tests: [{ input: `3,4,3,1,2`, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `3,4,3,1,2`, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
})
