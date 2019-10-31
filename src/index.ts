import { makeApp } from './app'
import { loadModules } from './app/modules'
import { serverStarter } from './app/infra/server-routes'
import { MongoClientDb } from './app/infra/persistence/mongo_db/client/MongoClient'
import { KoaServerModule } from './app/modules/server'
import { ProjectSettingsModule } from './app/modules/package-reader'

const app = makeApp(loadModules)
app.boot()
app.on(
  'application:booted',
  (): void => {
    app.start(
      (): void => {
        // llamar a la logica de negocio
        const { connect } = app.context['mongoDB'].context as MongoClientDb
        connect()
        const { webserver } = app.context['server'].context as KoaServerModule
        const info = app.context['package-reader'].context as ProjectSettingsModule
        serverStarter(webserver, info)
        console.log('app started')
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
