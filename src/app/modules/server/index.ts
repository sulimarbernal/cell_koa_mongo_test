import logger from '../../../utils/logger'
import Koa from 'koa'
import { ModuleBooter, Module } from '../index'

export interface KoaServerModule {
  webserver: Koa
}

export const boot: ModuleBooter = async (): Promise<Module<object>> => {
  const name = 'server'

  const app = new Koa()

  // Loading middlewares
  const { default: middlewaresHandler } = await import('./middlewares')
  await middlewaresHandler.register(app)

  return {
    name,
    context: { webserver: app },
    close: (): Promise<void> => {
      logger.info(`${name} closed`)
      return Promise.resolve()
    },
  }
}
