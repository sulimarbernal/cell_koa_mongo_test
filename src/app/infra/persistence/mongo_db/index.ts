import { UserRepository } from './../../../domain/repository/User'
import { User } from './../../../domain/entities/User'
import { makeUser } from './../../../domain/entities/index'
import { UserModel } from './models/User'

export const makeUserMongoRepository = (): UserRepository => {
  const saveUser = async (user: User): Promise<string> => {
    const userModel = new UserModel({ id: user.id, name: user.name, status: user.status, createdAt: user.createdAt })
    await userModel.save()
    return `${user.id}`
  }
  const findUser = async (id: string): Promise<User> => {
    const user = await UserModel.findOne({ id: id })
    if (!user) {
      console.log('a=>', user)
      throw new Error('usuario no encontrado')
    }
    return makeUser(user.id, user.name, user.createdAt)
  }
  return { saveUser, findUser }
};

