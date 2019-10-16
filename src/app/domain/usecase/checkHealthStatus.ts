import { status } from '../entities/Status'

interface DataFromApp {
  author: string
}

export const checkHealthStatus = (data: DataFromApp): object => {
  return { ...status, ...data }
}
