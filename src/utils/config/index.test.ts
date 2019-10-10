process.env.NODE_ENV = 'TEST'
process.env.LOG_LEVEL = 'debug'

import config from './index'

describe('Configuration client test', (): void => {
  it('should get all environment variables', (): void => {
    const vars = config.getAll()

    expect(vars.size).toBe(2)
    expect(vars.get('NODE_ENV')).toBe('TEST')
    expect(vars.get('LOG_LEVEL')).toBe('debug')
  })
})
