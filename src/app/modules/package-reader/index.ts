import fs from 'fs'
import { ModuleBooter, Module } from '../index'

interface ProjectSettings {
  createdAt: string
  name: string
  author: string
  version: string
}

export const boot: ModuleBooter = (): Module => {
  try {
    const name = 'package-reader'
    const projectProperties = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString())
    const settings: ProjectSettings = {
      createdAt: new Date().toISOString(),
      name: projectProperties.name,
      author: projectProperties.author,
      version: projectProperties.version,
    }

    return {
      name,
      context: settings,
      close: (): Promise<void> => {
        console.log(`${name} closed`)
        return Promise.resolve()
      },
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
