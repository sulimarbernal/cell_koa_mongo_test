import { Middleware } from 'koa'
import fs from 'fs'
import path from 'path'
import logger from '../../../../utils/logger'
import middlewaresOrder, { MiddlewaresOrder } from './order_configuration'

const getFullPath = (parentFolderPath: string, fileName: string): string => path.join(parentFolderPath, fileName)

const isDirectory = (fullFilePath: string): boolean => {
  const folder = fs.readdirSync(fullFilePath, { withFileTypes: true })
  return folder.length > 0
}

export interface MiddlewareModule {
  name: string
  middlewareModule: Promise<{ default: Middleware }>
}

export interface MiddlewareHandler {
  __getAllActiveMiddlewares: (middlewaresOrder: MiddlewaresOrder) => MiddlewareModule[]
  register: (app: any) => Promise<void>
}

const middlewaresHandler: MiddlewareHandler = {
  __getAllActiveMiddlewares: (middlewaresOrder): MiddlewareModule[] => {
    const activeMiddlewares: MiddlewareModule[] = []

    Object.keys(middlewaresOrder).forEach(
      (middlewareFolder): void => {
        const middlewarePath = getFullPath(__dirname, middlewareFolder)
        if (isDirectory(middlewarePath) && middlewaresOrder[middlewareFolder].active) {
          activeMiddlewares.push({ name: middlewareFolder, middlewareModule: import(middlewarePath) })
        }
      },
    )

    return activeMiddlewares
  },

  register: (app): Promise<void> => {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        logger.info('Registering middlewares:')
        const defers = middlewaresHandler.__getAllActiveMiddlewares(middlewaresOrder)

        try {
          const middlewares = await Promise.all(defers.map((x): Promise<{ default: Middleware }> => x.middlewareModule))
          middlewares.forEach(
            (middleware, index): void => {
              app.use(middleware.default)
              logger.verbose(`registered "${defers[index].name}"`)
            },
          )
        } catch (error) {
          reject(error)
        }

        resolve()
      },
    )
  },
}

export default middlewaresHandler
