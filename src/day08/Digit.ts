import { allLetters, Lines, locations } from "./definitions.js"

export class Digit {
  private lines: Lines
  private rawInput: string[]
  private rawOutput: string[]

  static counts = 0
  static decodedSum = 0

  constructor(textLine: string) {
    this.lines = {
      t: "-",
      tr: "-",
      tl: "-",
      m: "-",
      b: "-",
      br: "-",
      bl: "-",
    }
    this.rawInput = textLine.split("|")[0].trim().split(" ")
    this.rawOutput = textLine.split("|")[1].trim().split(" ")

    this.rawOutput.forEach(
      digit => [2, 3, 4, 7].includes(digit.length) && Digit.counts++,
    )

    this.identifyLines()

    // this.print()
  }

  identifyLines() {
    for (const config of allLetters) {
      this.lines = {
        t: config[0],
        tr: config[1],
        tl: config[2],
        m: config[3],
        b: config[4],
        br: config[5],
        bl: config[6],
      }

      let nums = Object.keys([...Array(10)]).map(Number)
      for (const word of this.rawInput) {
        const identifiedNum = this.identifyNumber(word)
        if (identifiedNum === undefined) break
        nums = nums.filter(num => num !== identifiedNum)
      }
      // found it
      if (nums.length === 0) {
        for (const finalNum of this.rawOutput) {
          const num = this.identifyNumber(finalNum)
          if (num) {
            console.log("8==========>")
            Digit.decodedSum += +num
          }
        }
        return
      }
    }
  }

  identifyNumber(word: string) {
    // word: ac
    // this.lines { t: 'a',c: 'b' }
    for (const digitBitsIndex in locations) {
      const row = locations[+digitBitsIndex]
      for (const digitBit of row) {
        if (
          word
            .split("")
            .every(letter => this.lines[digitBit as keyof Lines] === letter)
        ) {
          return +digitBitsIndex
        }
      }
    }
  }

  diffByLength(length1: number, length2: number): string {
    const wordByLength = (length: number) =>
      this.rawInput.find(word => word.length === length)
    const word1 = wordByLength(length1)
    const word2 = wordByLength(length2)
    if (!word1 || !word2) return ""
    return this.findMissingLetter(word1, word2)
  }

  findMissingLetter(word1: string, word2: string): string {
    if (word1.length < word2.length) {
      ;[word2, word1] = [word1, word2]
    }

    return word1
      .split("")
      .filter(letter => !word2.includes(letter))
      .join("")
  }

  print() {
    console.log(`
      ${this.lines.t}${this.lines.t}${this.lines.t}${this.lines.t}
     ${this.lines.tl}    ${this.lines.tr}
     ${this.lines.tl}    ${this.lines.tr}
     ${this.lines.tl}    ${this.lines.tr}
      ${this.lines.m}${this.lines.m}${this.lines.m}${this.lines.m}
     ${this.lines.bl}    ${this.lines.br}
     ${this.lines.bl}    ${this.lines.br}
     ${this.lines.bl}    ${this.lines.br}
      ${this.lines.b}${this.lines.b}${this.lines.b}${this.lines.b}
    `)
  }
}
