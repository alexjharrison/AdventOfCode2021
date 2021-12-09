export type Lines = {
  t?: string
  tr?: string
  tl?: string
  m?: string
  b?: string
  br?: string
  bl?: string
}

export const locations = [
  ["t", "tl", "tr", "bl", "br", "b"], // 6
  ["tr", "br"], // 2
  ["t", "tr", "m", "bl", "b"], // 5
  ["t", "tr", "m", "br", "b"], // 5
  ["tl", "tr", "m", "br"], // 4
  ["t", "tl", "m", "br", "b"], // 5
  ["t", "tl", "m", "bl", "br", "b"], // 6
  ["t", "tr", "br"], // 3
  ["t", "tl", "tr", "m", "bl", "br", "b"], // 7
  ["t", "tl", "tr", "m", "br", "b"], // 6
]

const permutator = (inputArr: string[]) => {
  let result: string[][] = []

  const permute = (arr: string[], m: string[] = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

export const allLetters = permutator(["a", "b", "c", "d", "e", "f", "g"])
