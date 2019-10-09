import { ModuleBooter, Module } from '../index'

export const boot: ModuleBooter = (): Module => {
  const name = 'message-broker'

  return {
    name,
    context: {},
    close: (): Promise<void> => {
      console.log(`${name} closed`)
      return Promise.resolve()
    },
  }
}
