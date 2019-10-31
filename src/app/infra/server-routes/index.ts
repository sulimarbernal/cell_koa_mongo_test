import Router from 'koa-router'
import { checkHealthStatus, getUser, saveUser } from './../../domain/usecase'
import { makeUserMongoRepository } from '../persistence/mongo_db'
//import { makeUserMemoryRepository } from '../persistence/memory_db'
import Koa, { Context } from 'koa'

export const serverStarter = (webserver: Koa, info: any): void => {
  const router = new Router()
  router.get(
    '/health',
    (ctx: Context): void => {
      ctx.body = checkHealthStatus({ author: info.author })
    },
  )

  router.get(
    '/getUser',
    async (ctx: Context): Promise<void> => {
      const id: string = ctx.request.query.id
      //ctx.body = await getUser(makeUserMemoryRepository(), id)
      ctx.body = await getUser(makeUserMongoRepository(), id)
    },
  )

  router.post(
    '/saveUser',
    async (ctx: Context): Promise<void> => {
      //ctx.body = await saveUser(makeUserMemoryRepository(), ctx.request.body)
      ctx.body = await saveUser(makeUserMongoRepository(), ctx.request.body)
    },
  )

  webserver.use(router.routes()).use(router.allowedMethods())

  webserver.listen(3001)
}
