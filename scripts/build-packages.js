#!/bin/node
/* eslint-disable no-console */

import fs from 'fs'

const dirs = fs
  .readdirSync(`packages`, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

const upperFirst = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
const titleCase = (str) => str.split(`-`).map(upperFirst).join(` `)
const pascalCase = (str) => str.split(`-`).map(upperFirst).join(``)

for (const packName of dirs) {
  console.log(`Creating package ${packName}...`)

  const iconFiles = fs.readdirSync(`packages/${packName}/icons`)

  const iconNames = iconFiles
    .filter((str) => str.endsWith(`.svelte`) && !str.match(/^\d/)) // discard files starting with digits
    .map((str) => str.split(`.`)[0]) // keep only the filename without extension

  const indexJsExports = iconNames
    .map(
      (icon) =>
        `export { default as ${pascalCase(icon)} } from './${icon}.svelte'`
    )
    .join(`\n`)

  fs.writeFileSync(`packages/${packName}/index.js`, indexJsExports)

  const pkg = {
    name: `@svicons/${packName}`,
    version: `0.1.5`,
    license: `MIT`,
    module: `./index.js`,
    type: `module`,
    keywords: [`svicons`, `svg`, `icons`, `svelte`, packName],
    author: `Janosh Riebesell <janosh.riebesell@gmail.com>`,
    description: `${titleCase(packName)} icons available as Svelte components`,
    homepage: `https://npmjs.com/package/@svicons/${packName}`,
    repository: `https://github.com/janosh/svicons`,
    publishConfig: {
      access: `public`,
    },
    exports: {
      '.': `./index.js`,
      ...Object.fromEntries(
        iconFiles.map((filename) => [`./${filename}`, `./icons/${filename}`])
      ),
    },
  }
  fs.writeFileSync(
    `packages/${packName}/package.json`,
    JSON.stringify(pkg, null, 2) + `\n`
  )

  let readme = fs.readFileSync(`scripts/readme-template.md`, `utf8`)
  for (const [slot, value] of [
    [`{packName}`, packName],
    [`{titleCasedPackName}`, titleCase(packName)],
    [`{fileName}`, iconNames[0]],
    [`{componentName}`, pascalCase(iconNames[0])],
    [/<!-- .+ -->\n/g, ``], // remove HTML comments
  ]) {
    readme = readme.replaceAll(slot, value)
  }
  fs.writeFileSync(`packages/${packName}/readme.md`, readme)

  const pkgStructure = fs.readdirSync(`packages/${packName}`)
  const expectedFiles = [`readme.md`, `package.json`, `index.js`, `icons`]
  if (!pkgStructure.every((file) => expectedFiles.includes(file))) {
    const extraFiles = pkgStructure.filter(
      (file) => !expectedFiles.includes(file)
    )
    throw new Error(
      `Unexpected files in package '${packName}': [${extraFiles}]`
    )
  }
}

console.log(`Finished building all ${dirs.length} packages!`)
