import { User } from '../entities/User'
import { UserRepository } from '../repository/User'

export const getUser = async (UserRepository: UserRepository, id: string): Promise<User> => {
  try {
    const rest = await UserRepository.findUser(id)
    return rest
  } catch (ex) {
    console.log(typeof ex)
    return ex.message
  }
}
