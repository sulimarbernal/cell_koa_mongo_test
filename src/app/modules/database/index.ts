import logger from '../../../utils/logger'
import { ModuleBooter, Module } from '../index'
import { MongoClient, MongoClientDb } from '../../infra/persistence/mongo_db/client/MongoClient'

export const boot: ModuleBooter = (): Module<MongoClientDb> => {
  const name = 'mongoDB'

  const connection = MongoClient().connect
  const disconnect = MongoClient().disconnect

  return {
    name,
    context: { connect: connection, disconnect },
    close: (): Promise<void> => {
      logger.info(`${name} closed`)
      return disconnect()
    },
  }
}
