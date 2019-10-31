export interface User {
  id: string
  status: string
  name: string
  createdAt?: Date
}

export function buildMakeUser(makeId: () => string): (status: string, name: string, createdAt?: Date) => User {
  return function makeUser(status: string, name: string, createdAt: Date = new Date()): User {
    let id = makeId()
    if (name.length <= 3) {
      throw new Error('nombrer del usuario debe contener mas de tres caracteres')
    }
    return {
      id,
      status,
      name,
      createdAt,
    }
  }
}
