import { UserRepository } from './../../../domain/repository/User'
import { User } from './../../../domain/entities/User'
import { makeUser } from './../../../domain/entities'

interface InMemoryUser extends User {
  _id: number
}

const userMemory: InMemoryUser[] = []

export function makeUserMemoryRepository(): UserRepository {
  const saveUser = (user: User): string => {
    let _id = userMemory.length + 1
    userMemory.push({ _id, id: user.id, name: user.name, status: user.status, createdAt: user.createdAt })
    return `${user.id}`
  }
  const findUser = (id: string): User => {
    const user = userMemory.find((element): boolean => element.id.toString() === id)
    if (!user) {
      throw new Error('usuario no encontrado')
    }

    return makeUser(user.status, user.name, user.createdAt)
  }
  return { saveUser, findUser }
}
