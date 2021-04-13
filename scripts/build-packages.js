#!/bin/node
/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'
const dirs = fs
  .readdirSync(`packages`, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

const upperFirst = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
const titleCase = (str) => str.split(`-`).map(upperFirst).join(` `)
const pascalCase = (str) => str.split(`-`).map(upperFirst).join(``)

const removeExt = (str) => path.basename(str, `.svelte`)

for (const dir of dirs) {
  console.log(`Processing ${dir}...`)
  const iconNames = fs
    .readdirSync(`packages/${dir}`)
    .filter((str) => str.endsWith(`.svelte`) && !str.match(/^\d/)) // discard index.js files starting with digits
    .map(removeExt)

  const imports = iconNames
    .map(
      (icon) =>
        `export { default as ${pascalCase(icon)} } from './${icon}.svelte'`
    )
    .join(`\n`)

  fs.writeFileSync(`packages/${dir}/index.js`, imports)

  const pkg = {
    name: `@svicons/${dir}`,
    version: `0.1.3`,
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
  fs.writeFileSync(`packages/${dir}/package.json`, JSON.stringify(pkg, null, 2))

  fs.writeFileSync(`packages/${dir}/.gitignore`, `*.svelte\n*.js\n`)
  fs.writeFileSync(`packages/${dir}/.npmignore`, ``)

  let readme = fs.readFileSync(`scripts/readme-template.md`, `utf8`)
  for (const [slot, newStr] of [
    [`{packName}`, dir],
    [`{titleCasedPackName}`, titleCase(dir)],
    [`{fileName}`, iconNames[0]],
    [`{componentName}`, pascalCase(iconNames[0])],
    [/<!-- .+ -->\n/g, ``], // remove HTML comments
  ]) {
    readme = readme.replaceAll(slot, newStr)
  }
  fs.writeFileSync(`packages/${dir}/readme.md`, readme)
}
