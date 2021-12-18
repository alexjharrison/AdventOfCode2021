import run from "aocrunner"
import { promises } from "fs"

interface Packet {
  version: number
  typeId: number
  value: number | null
  children: Packet[]
}

let sequence: string = ""
let shifted: number = 0

function shift(numChars: number) {
  shifted += numChars
  const substr = sequence.slice(0, numChars)
  sequence = sequence.slice(numChars)
  return substr
}

function processNext(): Packet {
  let packet: Packet = {
    version: parseInt(shift(3), 2),
    typeId: parseInt(shift(3), 2),
    value: null,
    children: [],
  }

  // literal packet
  if (packet.typeId === 4) {
    packet.value = parseLiteralValue()
  }
  // operator packet
  else {
    // 15 bits => length of subpackets
    if (shift(1) === "0") {
      const length = parseInt(shift(15), 2)
      const startingLength = shifted

      while (shifted - startingLength < length) {
        const newChild = processNext()
        packet.children.push(newChild)
      }
    }
    // 11 bits => number of subpackets
    else {
      const numSubpackets = parseInt(shift(11), 2)
      for (let i = 0; i < numSubpackets; i++) {
        const newChild = processNext()
        packet.children.push(newChild)
      }
    }
  }
  return packet
}

function parseLiteralValue(): number {
  let sum = ""
  while (shift(1) === "1") {
    sum += shift(4)
  }
  sum += shift(4)
  return parseInt(sum, 2)
}

function parseVersions(packet: Packet): number {
  return packet.children.reduce(
    (sum, child) => sum + parseVersions(child),
    packet.version,
  )
}

function parsePacket(packet: Packet): Packet {
  if (packet.value !== null) return packet
  packet.children = packet.children.map(parsePacket)

  // sum
  if (packet.typeId === 0)
    packet.value = packet.children.reduce(
      (sum, child) => sum + (child.value ?? 0),
      0,
    )

  // product
  if (packet.typeId === 1) {
    packet.value = packet.children.reduce(
      (sum, child) => sum * (child.value ?? 1),
      1,
    )
  }
  // minimum
  else if (packet.typeId === 2) {
    packet.value = Math.min(
      ...packet.children.map(child => child.value || Infinity),
    )
  }
  // maximum
  else if (packet.typeId === 3) {
    packet.value = Math.max(
      ...packet.children.map(child => child.value || -Infinity),
    )
  }
  // greater than
  else if (packet.typeId === 5) {
    console.log(packet.children.length)
    packet.value =
      (packet.children[0].value || 0) > (packet.children[1].value || 0) ? 1 : 0
  }
  // less than
  else if (packet.typeId === 6) {
    console.log(packet.children.length)
    packet.value =
      (packet.children[0].value || 0) > (packet.children[1].value || 0) ? 0 : 1
  }
  // equal to
  else if (packet.typeId === 7) {
    console.log(packet.children.length)
    packet.value =
      (packet.children[0].value || 0) === (packet.children[1].value || 0)
        ? 1
        : 0
  }

  return packet
}

const part1 = (input: string) => {
  sequence = input
    .split("")
    .map(i => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("")
  const packet = processNext()
  return parseVersions(packet)
}

const part2 = (input: string) => {
  sequence = input
    .split("")
    .map(i => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("")
  const packet = processNext()
  promises.writeFile("packet.json", JSON.stringify(packet), "utf-8")
  return parsePacket(packet).value || 0
}

run({
  part1: {
    tests: [
      // { input: "8A004A801A8002F478", expected: 16 },
      // { input: "620080001611562C8802118E34", expected: 12 },
      // { input: "C0015000016115A2E0802F182340", expected: 23 },
      // { input: "A0016C880162017C3686B18A3D4780", expected: 31 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: "C200B40A82", expected: 3 },
      { input: "04005AC33890", expected: 54 },
      { input: "880086C3E88112", expected: 7 },
      { input: "CE00C43D881120", expected: 9 },
      { input: "D8005AC2A8F0", expected: 1 },
      { input: "F600BC2D8F", expected: 0 },
      { input: "9C005AC2F8F0", expected: 0 },
      { input: "9C0141080250320F1802104A08", expected: 1 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
