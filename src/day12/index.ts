import run from "aocrunner"

interface Graph {
  [key: string]: string[]
  visitOnce: string[]
  path: string[]
}

// let graph: Graph = { visitOnce: [], path: [] }

const parseInput = (input: string): Graph => {
  const lines = input.split("\n").map(line => line.split("-"))
  const graph = lines.reduce<Graph>(
    (graph, [first, second]) => {
      if (graph[first]) graph[first].push(second)
      else graph[first] = [second]

      if (graph[second]) graph[second].push(first)
      else graph[second] = [first]

      if (first !== "start" && first !== "end" && first.toLowerCase() === first)
        graph.visitOnce.push(first)

      if (
        second !== "start" &&
        second !== "end" &&
        second.toLowerCase() === second
      )
        graph.visitOnce.push(second)

      return graph
    },
    { visitOnce: [], path: [] },
  )

  return { ...graph, visitOnce: [...new Set(graph.visitOnce)] }
}

const part1 = (input: string) => {
  const graph = parseInput(input)
  let count = 0
  function goDeep(location: string, state: Graph) {
    if (location === "end") {
      count++
      return
    }
    // don't go back to start
    // go to lowercase if in visitOnce
    // go to upperCase
    // go to end
    const nextSteps = graph[location].filter(
      nextLocation =>
        nextLocation !== "start" &&
        (state.visitOnce.includes(nextLocation) ||
          nextLocation.toUpperCase() === nextLocation ||
          nextLocation === "end"),
    )

    nextSteps.forEach(nextStep => {
      goDeep(nextStep, {
        ...state,
        path: [...state.path, location],
        visitOnce: state.visitOnce.filter(here => here !== location),
      })
    })
  }
  goDeep("start", graph)
  return count
}

const part2 = (input: string) => {
  const graph = parseInput(input)
  let count = 0
  function goDeep(location: string, state: Graph, canRevisit: boolean) {
    if (location === "end") {
      count++
      console.log(state.path.join(" -> ") + " -> end")
      return
    }
    // don't go back to start
    // go to lowercase if in visitOnce
    // go to upperCase
    // go to end
    const nextSteps = graph[location].filter(
      nextLocation =>
        nextLocation !== "start" &&
        (state.visitOnce.includes(nextLocation) ||
          nextLocation.toUpperCase() === nextLocation ||
          nextLocation === "end"),
    )

    nextSteps.forEach(nextStep => {
      const newVisitOnce = canRevisit
        ? [...state.visitOnce]
        : state.visitOnce.filter(here => here !== location)

      if (state.path.includes(nextStep.toLowerCase())) {
        canRevisit = false
      }

      goDeep(
        nextStep,
        {
          path: [...state.path, location],
          visitOnce: newVisitOnce,
        },
        canRevisit,
      )
    })
  }
  goDeep("start", graph, true)
  return count
}

run({
  //   part1: {
  //     tests: [
  //       {
  //         input: `start-A
  // start-b
  // A-c
  // A-b
  // b-d
  // A-end
  // b-end`,
  //         expected: 10,
  //       },
  //       {
  //         input: `dc-end
  // HN-start
  // start-kj
  // dc-start
  // dc-HN
  // LN-dc
  // HN-end
  // kj-sa
  // kj-HN
  // kj-dc`,
  //         expected: 19,
  //       },
  //       {
  //         input: `fs-end
  // he-DX
  // fs-he
  // start-DX
  // pj-DX
  // end-zg
  // zg-sl
  // zg-pj
  // pj-he
  // RW-he
  // fs-DX
  // pj-RW
  // zg-RW
  // start-pj
  // he-WI
  // zg-he
  // pj-fs
  // start-RW`,
  //         expected: 226,
  //       },
  //     ],
  //     solution: part1,
  //   },
  part2: {
    tests: [
      {
        input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
        expected: 36,
      },
      //       {
      //         input: `dc-end
      // HN-start
      // start-kj
      // dc-start
      // dc-HN
      // LN-dc
      // HN-end
      // kj-sa
      // kj-HN
      // kj-dc`,
      //         expected: 103,
      //       },
      //       {
      //         input: `fs-end
      // he-DX
      // fs-he
      // start-DX
      // pj-DX
      // end-zg
      // zg-sl
      // zg-pj
      // pj-he
      // RW-he
      // fs-DX
      // pj-RW
      // zg-RW
      // start-pj
      // he-WI
      // zg-he
      // pj-fs
      // start-RW`,
      //         expected: 3509,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
