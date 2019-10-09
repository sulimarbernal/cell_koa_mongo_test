import { EventEmitter } from 'events'
import { Module, ModulesLoader } from './modules'

interface AppContext {
  [key: string]: Module
}

export interface Application extends EventEmitter {
  context: AppContext
  boot: () => Promise<void>
  start: (callback: Function) => void
  close: () => void
}

export function makeApp(loadModules: ModulesLoader): Application {
  const app = new EventEmitter() as Application

  app.context = {}
  app.boot = async (): Promise<void> => {
    try {
      const modules = await loadModules()

      const emptyContexStarter: AppContext = {}
      app.context = modules.reduce((prev, current): AppContext => {
        prev[current.name] = { ...current }
        return prev
      }, emptyContexStarter)

      app.emit('application:booted', app)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  app.start = (callback: Function): void => {
    // TODO
    callback()
  }

  app.close = (): void => {
    Object.keys(app.context).forEach(
      (moduleName): void => {
        app.context[moduleName].close()
      },
    )
    console.log('all closed')
  }

  return app
}
