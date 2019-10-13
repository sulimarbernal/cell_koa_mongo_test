process.env.NODE_ENV = 'TEST'
process.env.LOG_LEVEL = 'debug'

import config from './index'

describe('Configuration client test', (): void => {
  it('should get empty string if no key is found', (): void => {
    expect(config.get('NO_KEY')).toEqual('')
  })

  it('should get a valid value if key is found', (): void => {
    expect(config.get('NODE_ENV')).toEqual('TEST')
  })

  it('should get all environment variables', (): void => {
    const vars = config.getAll()

    expect(vars.size).toBe(2)
    expect(vars.get('NODE_ENV')).toBe('TEST')
    expect(vars.get('LOG_LEVEL')).toBe('debug')
  })
})
