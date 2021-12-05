import run from "aocrunner"

const numRows = 5

function parseInput(input: string) {
  const rows = input.split("\n").map((row) => row.trim())
  const drawnNums = rows[0].split(",").map(Number)
  rows.splice(0, 2)

  const boards: number[][] = []
  let currentBoard: number[] = []
  for (const line in rows) {
    currentBoard.push(
      ...rows[line]
        .split(" ")
        .filter((num) => num)
        .map(Number),
    )
    if (currentBoard.length === numRows ** 2) {
      boards.push(currentBoard)
      currentBoard = []
    }
  }
  return { drawnNums, boards }
}

const checkRowsCols = (drawnNums: number[], board: number[]): boolean => {
  for (let i = 0; i < numRows; i++) {
    // check columns
    if (
      checkAll(
        drawnNums,
        board.filter((_, idx) => idx % numRows === i),
      )
    )
      return true

    // check rows
    const row = board.slice(i * numRows, i * numRows + numRows)
    if (checkAll(drawnNums, row)) return true
  }
  return false
}

const checkAll = (drawnNums: number[], rowCol: number[]): boolean => {
  return rowCol.every((boardNum) => drawnNums.includes(boardNum))
}

const part1 = (input: string) => {
  const { boards, drawnNums } = parseInput(input)
  for (const i in drawnNums) {
    const currentDrawnNums = drawnNums.slice(0, +i)

    for (const board of boards) {
      if (checkRowsCols(currentDrawnNums, board)) {
        const uncalledNums = board.filter(
          (num) => !currentDrawnNums.includes(num),
        )
        const latest = currentDrawnNums[currentDrawnNums.length - 1]

        return latest * uncalledNums.reduce((sum, num) => sum + num, 0)
      }
    }
  }
}

const part2 = (input: string) => {
  const { boards, drawnNums } = parseInput(input)
  const winningBoards: number[] = []
  const drawnNumsIdxs: number[] = []
  let boardsCopy = [...boards]
  for (const i in drawnNums) {
    const currentDrawnNums = drawnNums.slice(0, +i)

    for (const boardIdx in boards) {
      if (checkRowsCols(currentDrawnNums, boards[boardIdx])) {
        if (!winningBoards.includes(+boardIdx)) {
          winningBoards.push(+boardIdx)
          drawnNumsIdxs.push(+i)
        }

        const boardCopyIdx = boardsCopy.findIndex(
          (board) => JSON.stringify(board) === JSON.stringify(boards[boardIdx]),
        )
        if (boardCopyIdx >= 0) boardsCopy.splice(boardCopyIdx, 1)
        // break
      }
    }
  }

  const lastWinningBoard = boards[winningBoards[winningBoards.length - 1]]
  const lastDrawnNumIdx = drawnNumsIdxs[drawnNumsIdxs.length - 1]
  const lastWinningDrawnNum = drawnNums[lastDrawnNumIdx - 1]
  const currentDrawnNums = drawnNums.slice(0, lastDrawnNumIdx)

  const uncalledNums = lastWinningBoard.filter(
    (num) => !currentDrawnNums.includes(num),
  )

  return lastWinningDrawnNum * uncalledNums.reduce((sum, num) => sum + num, 0)
}

const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
  8  2 23  4 24
21  9 14 16  7
  6 10  3 18  5
  1 12 20 15 19

  3 15  0  2 22
  9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
  2  0 12  3  7`

run({
  part1: {
    // tests: [{ input, expected: 4512 }],
    solution: part1,
  },
  part2: {
    // tests: [{ input, expected: 1924 }],
    solution: part2,
  },
  trimTestInputs: true,
})
