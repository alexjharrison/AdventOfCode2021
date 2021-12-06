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
}

const part2 = (input: string) => {
  const nums = input.split(",")

  const hash = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
  }

  type Hash = typeof hash

  for (let i = 0; i < nums.length; i++) {
    hash[nums[i] as keyof Hash]++
  }

  for (let i = 0; i < 256; i++) {
    const zeroVal = hash["0"]
    for (let j = 0; j < 8; j++) {
      hash[String(j) as keyof Hash] = hash[String(j + 1) as keyof Hash]
    }
    hash["8"] = zeroVal
    hash["6"] += zeroVal
  }

  let sum = 0
  for (let i = 0; i <= 8; i++) {
    sum += hash[String(i) as keyof Hash]
  }

  return sum
}

run({
  part1: {
    tests: [{ input: `3,4,3,1,2`, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `3,4,3,1,2`, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
})
