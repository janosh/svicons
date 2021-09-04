export const upperFirst = (str) =>
  str.substring(0, 1).toUpperCase() + str.substring(1)


export const titleCase = (str) => str.split(`-`).map(upperFirst).join(` `)


export const pascalCase = (str) => str.split(`-`).map(titleCase).join(``)
