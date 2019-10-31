import { makeId } from '../../../utils'
import { buildMakeUser } from './User'

export const makeUser = buildMakeUser(makeId)
