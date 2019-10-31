import { Middleware } from 'koa'

const loggerMiddleware: Middleware = async (ctx, next): Promise<void> => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
}

export default loggerMiddleware
