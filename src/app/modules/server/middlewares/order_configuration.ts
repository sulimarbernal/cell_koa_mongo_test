export interface MiddlewaresOrder {
  [s: string]: { active: boolean }
}

const middlewaresOrder: MiddlewaresOrder = {
  'body-parser': { active: true },
  'requests-logger': { active: true },
  'response-time': { active: true },
}

export default middlewaresOrder
