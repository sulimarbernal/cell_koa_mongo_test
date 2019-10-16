import logger from '../../../utils/logger'
import Koa from 'koa'
import { ModuleBooter, Module } from '../index'

export interface KoaServerModule {
  webserver: Koa
}

export const boot: ModuleBooter = (): Module<KoaServerModule> => {
  const name = 'server'

  const app = new Koa()
  app.use(
    async (ctx, next): Promise<void> => {
      await next()
      const rt = ctx.response.get('X-Response-Time')
      console.log(`${ctx.method} ${ctx.url} - ${rt}`)
    },
  )
  // x-response-time

  app.use(
    async (ctx, next): Promise<void> => {
      const start = Date.now()
      await next()
      const ms = Date.now() - start
      ctx.set('X-Response-Time', `${ms}ms`)
    },
  )

  return {
    name,
    context: { webserver: app },
    close: (): Promise<void> => {
      logger.info(`${name} closed`)
      return Promise.resolve()
    },
  }
}
