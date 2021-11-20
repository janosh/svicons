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

for (const dir of dirs) {
  console.log(`Creating package ${dir}...`)

  const iconNames = fs
    .readdirSync(`packages/${dir}/icons`)
    .filter((str) => str.endsWith(`.svelte`) && !str.match(/^\d/)) // discard index.js + files starting with digits
    .map((str) => str.trimRight(`.svelte`))

  const indexJsExports = iconNames
    .map(
      (icon) =>
        `export { default as ${pascalCase(icon)} } from './${icon}.svelte'`
    )
    .join(`\n`)

  fs.writeFileSync(`packages/${dir}/index.js`, indexJsExports)

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
  fs.writeFileSync(
    `packages/${dir}/package.json`,
    JSON.stringify(pkg, null, 2) + `\n`
  )

  let readme = fs.readFileSync(`scripts/readme-template.md`, `utf8`)
  for (const [slot, value] of [
    [`{packName}`, dir],
    [`{titleCasedPackName}`, titleCase(dir)],
    [`{fileName}`, iconNames[0]],
    [`{componentName}`, pascalCase(iconNames[0])],
    [/<!-- .+ -->\n/g, ``], // remove HTML comments
  ]) {
    readme = readme.replaceAll(slot, value)
  }
  fs.writeFileSync(`packages/${dir}/readme.md`, readme)

  const pkgStructure = fs.readdirSync(`packages/${dir}`)
  const expectedFiles = [`readme.md`, `package.json`, `index.js`, `icons`]
  if (!pkgStructure.every((file) => expectedFiles.includes(file))) {
    const extraFiles = pkgStructure.filter(
      (file) => !expectedFiles.includes(file)
    )
    throw new Error(`Unexpected files in package '${dir}': [${extraFiles}]`)
  }
}

console.log(`Finished building all ${dirs.length} packages!`)
