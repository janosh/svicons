export const upperFirst = (str: string): string =>
  str.substring(0, 1).toUpperCase() + str.substring(1)

export const titleCase = (str: string): string =>
  str.split(`-`).map(upperFirst).join(` `)

export const pascalCase = (str: string): string =>
  str.split(`-`).map(titleCase).join(``)
