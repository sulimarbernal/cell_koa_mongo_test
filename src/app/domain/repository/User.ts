import { User } from '../entities/User'

export interface UserRepository {
  saveUser: (user: User) => Promise<string> | string
  findUser: (id: string) => Promise<User> | User
}
