import { User } from '../entities/User'
import { makeUser } from '../entities'
import { UserRepository } from '../repository/User'

export const saveUser = async (UserRepository: UserRepository, body: User): Promise<object> => {
  const user: User = makeUser(body.name, body.status)
  try {
    const save = await UserRepository.saveUser(user)
    return { id: save }
  } catch (ex) {
    return ex.message
  }
}
