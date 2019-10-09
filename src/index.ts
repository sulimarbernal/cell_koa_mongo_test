import { makeApp } from './app'
import { loadModules } from './app/modules'

const app = makeApp(loadModules)
app.boot()
app.on(
  'application:booted',
  (): void => {
    app.start(
      (): void => {
        // llamar a la logica de negocio
        console.log('app started')
        // console.log(app.context)
      },
    )
  },
)

process.on(
  'uncaughtException',
  (error): void => {
    console.error('Exiting program because of [Uncaught Exception Error]', error)
    process.exit(1)
  },
)
process.on(
  'unhandledRejection',
  (error): void => {
    console.error('Exiting program because of [Unhandled Promise rejection Error]::', error)
    process.exit(1)
  },
)

process.on('SIGINT', app.close)
process.on('SIGTERM', app.close)
