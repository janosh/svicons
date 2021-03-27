#!/bin/node
/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'
const dirs = fs.readdirSync(`src/icons`)

// https://stackoverflow.com/a/54651317
const clearAndUpper = (str) => str.replace(/-/, ``).toUpperCase()
const toPascalCase = (str) => str.replace(/(^\w|-\w)/g, clearAndUpper)

const removeExt = (str) => path.basename(str, `.svelte`)

for (const dir of dirs) {
  console.log(`Processing ${dir}...`)
  const icons = fs
    .readdirSync(`src/icons/${dir}`)
    .filter((str) => str.endsWith(`.svelte`) && !str.match(/^\d/)) // discard index.js files starting with digits
    .map(removeExt)

  const imports = icons
    .map((icon) => `import ${toPascalCase(icon)} from './${icon}.svelte'`)
    .join(`\n`)

  const defaultExport = `\n\nexport default [${icons
    .map((icon) => `[${toPascalCase(icon)}, '${icon}']`)
    .join(`, `)}]\n`

  fs.writeFileSync(`src/icons/${dir}/index.js`, imports + defaultExport)
}
