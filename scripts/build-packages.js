#!/bin/node
/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'
const dirs = fs
  .readdirSync(`src/icons`, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

const upperFirst = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
const titleCase = (str) => str.split(`-`).map(upperFirst).join(` `)
const pascalCase = (str) => str.split(`-`).map(upperFirst).join(``)

const removeExt = (str) => path.basename(str, `.svelte`)

for (const dir of dirs) {
  console.log(`Processing ${dir}...`)
  const icons = fs
    .readdirSync(`src/icons/${dir}`)
    .filter((str) => str.endsWith(`.svelte`) && !str.match(/^\d/)) // discard index.js files starting with digits
    .map(removeExt)

  const imports = icons
    .map(
      (icon) =>
        `export { default as ${pascalCase(icon)} } from './${icon}.svelte'`
    )
    .join(`\n`)

  // const defaultExport = `\n\nexport default [${icons
  //   .map((icon) => `[${toPascalCase(icon)}, '${icon}']`)
  //   .join(`, `)}]\n`

  fs.writeFileSync(`src/icons/${dir}/index.js`, imports)

  const pkg = {
    name: `@svicons/${dir}`,
    version: `0.1.0`,
    license: `MIT`,
    module: `./index.js`,
    type: `module`,
    devDependencies: {
      [`@svg-icons/${dir}`]: `latest`,
    },
    keywords: [`svicons`, `svg`, `icons`, `svelte`, dir],
    author: `Janosh Riebesell <janosh.riebesell@gmail.com>`,
    description: `${titleCase(dir)} icons available as Svelte components`,
    homepage: `https://github.com/janosh/svicons#readme`,
    repository: `git://github.com/janosh/svicons`,
    publishConfig: {
      access: `public`,
    },
  }
  fs.writeFileSync(
    `src/icons/${dir}/package.json`,
    JSON.stringify(pkg, null, 2)
  )

  fs.writeFileSync(`src/icons/${dir}/.gitignore`, `*.svelte\n*.js\n`)
  fs.writeFileSync(`src/icons/${dir}/.npmignore`, ``)
}
