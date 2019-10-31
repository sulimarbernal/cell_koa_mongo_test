export const makeId = (): string => [...Array(10)].map((): number => Math.floor(Math.random() * 10)).join('')
