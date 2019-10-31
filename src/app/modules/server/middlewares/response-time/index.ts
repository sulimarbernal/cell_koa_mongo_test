import { Middleware } from 'koa'

const responseTimeMiddleware: Middleware = async (ctx, next): Promise<void> => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ctx.method} ${ctx.url} - ${ms}ms`)
}

export default responseTimeMiddleware
