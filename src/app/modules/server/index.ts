import logger from '../../../utils/logger'
import { ModuleBooter, Module } from '../index'

export const boot: ModuleBooter = (): Module => {
  const name = 'server'

  return {
    name,
    context: {},
    close: (): Promise<void> => {
      logger.info(`${name} closed`)
      return Promise.resolve()
    },
  }
}
