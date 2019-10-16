import fs from 'fs'
import { ModuleBooter, Module } from '../index'
import logger from '../../../utils/logger'

export interface ProjectSettingsModule {
  createdAt: string
  name: string
  author: string
  version: string
}

export const boot: ModuleBooter = (): Module<ProjectSettingsModule> => {
  try {
    const name = 'package-reader'
    const projectProperties = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString())
    const settings: ProjectSettingsModule = {
      createdAt: new Date().toISOString(),
      name: projectProperties.name,
      author: projectProperties.author,
      version: projectProperties.version,
    }

    return {
      name,
      context: settings,
      close: (): Promise<void> => {
        logger.info(`${name} closed`)
        return Promise.resolve()
      },
    }
  } catch (error) {
    logger.error(error.toString())
    throw error
  }
}
