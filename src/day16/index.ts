import run from "aocrunner"
import { promises } from "fs"

interface Packet {
  version: number
  typeId: number
  value: number | null
  children: Packet[]
}

let sequence: string = ""
let strShifted: number = 0

function strShift(numChars: number) {
  strShifted += numChars
  const substr = sequence.slice(0, numChars)
  sequence = sequence.slice(numChars)
  return substr
}

function processNext(): Packet {
  let packet: Packet = {
    version: parseInt(strShift(3), 2),
    typeId: parseInt(strShift(3), 2),
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
    if (strShift(1) === "0") {
      const length = parseInt(strShift(15), 2)
      const startingLength = strShifted

      while (strShifted - startingLength < length) {
        const newChild = processNext()
        packet.children.push(newChild)
      }
    }
    // 11 bits => number of subpackets
    else {
      const numSubpackets = parseInt(strShift(11), 2)
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
  while (strShift(1) === "1") {
    sum += strShift(4)
  }
  sum += strShift(4)
  return parseInt(sum, 2)
}

function parseVersions(packet: Packet): number {
  return packet.children.reduce(
    (sum, child) => sum + parseVersions(child),
    packet.version,
  )
}

function parseValueFromChildren(packet: Packet): Packet {
  if (packet.value !== null) return packet
  packet.children = packet.children.map(parseValueFromChildren)

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
      ...packet.children.map(child => child.value ?? Infinity),
    )
  }
  // maximum
  else if (packet.typeId === 3) {
    packet.value = Math.max(
      ...packet.children.map(child => child.value ?? -Infinity),
    )
  }
  // greater than
  else if (packet.typeId === 5) {
    packet.value =
      (packet.children[0].value ?? 0) > (packet.children[1].value ?? 0) ? 1 : 0
  }
  // less than
  else if (packet.typeId === 6) {
    packet.value =
      (packet.children[0].value ?? 0) > (packet.children[1].value ?? 0) ? 0 : 1
  }
  // equal to
  else if (packet.typeId === 7) {
    packet.value =
      (packet.children[0].value ?? 0) === (packet.children[1].value ?? 0)
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
  promises.writeFile("./src/day16/packet.json", JSON.stringify(packet), "utf-8")
  return parseVersions(packet)
}

const part2 = (input: string) => {
  // hex to binary
  sequence = input
    .split("")
    .map(i => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("")

  const packet = processNext()
  const valuesCalculated = parseValueFromChildren(packet)

  promises.writeFile(
    "./src/day16/packet.json",
    JSON.stringify(valuesCalculated),
    "utf-8",
  )
  return valuesCalculated.value || 0
}

run({
  part1: {
    tests: [
      // { input: "8A004A801A8002F478", expected: 16 },
      // { input: "620080001611562C8802118E34", expected: 12 },
      // { input: "C0015000016115A2E0802F182340", expected: 23 },
      // { input: "A0016C880162017C3686B18A3D4780", expected: 31 },
      // { input: "0600878021220122E1273080", expected: 0 },
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
      { input: "3232D42BF9400 ", expected: 5000000000 },
      { input: "D2FE28", expected: 2021 },
      {
        input:
          "005410C99A9802DA00B43887138F72F4F652CC0159FE05E802B3A572DBBE5AA5F56F6B6A4600FCCAACEA9CE0E1002013A55389B064C0269813952F983595234002DA394615002A47E06C0125CF7B74FE00E6FC470D4C0129260B005E73FCDFC3A5B77BF2FB4E0009C27ECEF293824CC76902B3004F8017A999EC22770412BE2A1004E3DCDFA146D00020670B9C0129A8D79BB7E88926BA401BAD004892BBDEF20D253BE70C53CA5399AB648EBBAAF0BD402B95349201938264C7699C5A0592AF8001E3C09972A949AD4AE2CB3230AC37FC919801F2A7A402978002150E60BC6700043A23C618E20008644782F10C80262F005679A679BE733C3F3005BC01496F60865B39AF8A2478A04017DCBEAB32FA0055E6286D31430300AE7C7E79AE55324CA679F9002239992BC689A8D6FE084012AE73BDFE39EBF186738B33BD9FA91B14CB7785EC01CE4DCE1AE2DCFD7D23098A98411973E30052C012978F7DD089689ACD4A7A80CCEFEB9EC56880485951DB00400010D8A30CA1500021B0D625450700227A30A774B2600ACD56F981E580272AA3319ACC04C015C00AFA4616C63D4DFF289319A9DC401008650927B2232F70784AE0124D65A25FD3A34CC61A6449246986E300425AF873A00CD4401C8A90D60E8803D08A0DC673005E692B000DA85B268E4021D4E41C6802E49AB57D1ED1166AD5F47B4433005F401496867C2B3E7112C0050C20043A17C208B240087425871180C01985D07A22980273247801988803B08A2DC191006A2141289640133E80212C3D2C3F377B09900A53E00900021109623425100723DC6884D3B7CFE1D2C6036D180D053002880BC530025C00F700308096110021C00C001E44C00F001955805A62013D0400B400ED500307400949C00F92972B6BC3F47A96D21C5730047003770004323E44F8B80008441C8F51366F38F240",
        expected: 258888628940,
      },
      {
        input:
          "C20D718021600ACDC372CD8DE7A057252A49C940239D68978F7970194EA7CCB310088760088803304A0AC1B100721EC298D3307440041CD8B8005D12DFD27CBEEF27D94A4E9B033006A45FE71D665ACC0259C689B1F99679F717003225900465800804E39CE38CE161007E52F1AEF5EE6EC33600BCC29CFFA3D8291006A92CA7E00B4A8F497E16A675EFB6B0058F2D0BD7AE1371DA34E730F66009443C00A566BFDBE643135FEDF321D000C6269EA66545899739ADEAF0EB6C3A200B6F40179DE31CB7B277392FA1C0A95F6E3983A100993801B800021B0722243D00042E0DC7383D332443004E463295176801F29EDDAA853DBB5508802859F2E9D2A9308924F9F31700AA4F39F720C733A669EC7356AC7D8E85C95E123799D4C44C0109C0AF00427E3CC678873F1E633C4020085E60D340109E3196023006040188C910A3A80021B1763FC620004321B4138E52D75A20096E4718D3E50016B19E0BA802325E858762D1802B28AD401A9880310E61041400043E2AC7E8A4800434DB24A384A4019401C92C154B43595B830002BC497ED9CC27CE686A6A43925B8A9CFFE3A9616E5793447004A4BBB749841500B26C5E6E306899C5B4C70924B77EF254B48688041CD004A726ED3FAECBDB2295AEBD984E08E0065C101812E006380126005A80124048CB010D4C03DC900E16A007200B98E00580091EE004B006902004B00410000AF00015933223100688010985116A311803D05E3CC4B300660BC7283C00081CF26491049F3D690E9802739661E00D400010A8B91F2118803310A2F43396699D533005E37E8023311A4BB9961524A4E2C027EC8C6F5952C2528B333FA4AD386C0A56F39C7DB77200C92801019E799E7B96EC6F8B7558C014977BD00480010D89D106240803518E31C4230052C01786F272FF354C8D4D437DF52BC2C300567066550A2A900427E0084C254739FB8E080111E0",
        expected: 19348959966392,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
