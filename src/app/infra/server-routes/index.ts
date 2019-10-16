import Router from 'koa-router'
import { checkHealthStatus } from '../../domain/usecase/checkHealthStatus'
import Koa, { Context } from 'koa'

export const serverStarter = (webserver: Koa, info: any): void => {
  const router = new Router()
  router.get(
    '/health',
    (ctx: Context): void => {
      ctx.body = checkHealthStatus({ author: info.author })
    },
  )
  webserver.use(router.routes()).use(router.allowedMethods())

  webserver.listen(3000)
}
