/* eslint-disable no-console */

// Create package.json, index.js, type declarations files for each icon pack.
// Call with `node scripts/build-packages.js`.

import fs from 'fs'

const dirs = fs
  .readdirSync(`src/lib`, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

const upperFirst = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
const titleCase = (str) => str.split(`-`).map(upperFirst).join(` `)
const pascalCase = (str) => str.split(`-`).map(upperFirst).join(``)

const exportIcon = (name) =>
  `export { default as ${pascalCase(name)} } from './${name}.svelte'`

for (const packName of dirs) {
  console.log(`Creating package ${packName}...`)

  const iconFiles = fs
    .readdirSync(`src/lib/${packName}/`)
    .filter((file) => file.endsWith(`.svelte`))

  if (iconFiles[0].includes(`/`)) {
    throw `${iconFiles[0]} should be file-name only and not contain slashes`
  }

  const iconNames = iconFiles
    .filter((str) => str.endsWith(`.svelte`) && !str.match(/^\d/)) // discard files starting with digits
    .map((str) => str.split(`.`)[0]) // keep only the filename without extension

  const indexExports = iconNames.map(exportIcon).join(`\n`)
  fs.writeFileSync(`src/lib/${packName}/index.js`, indexExports)
  fs.writeFileSync(`src/lib/${packName}/index.d.ts`, indexExports)

  const pkg = {
    name: `@svicons/${packName}`,
    version: `0.1.11`,
    license: `MIT`,
    type: `module`,
    main: `./index.js`,
    svelte: `./index.js`,
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
        iconFiles.map((filename) => [`./${filename}`, `./${filename}`])
      ),
    },
  }
  fs.writeFileSync(
    `src/lib/${packName}/package.json`,
    JSON.stringify(pkg, null, 2) + `\n`
  )

  const iconDts = fs.readFileSync(`scripts/template-icon.svelte.d.ts`, `utf8`)
  // create type declaration files for each icon
  for (const iconName of iconNames) {
    fs.writeFileSync(
      `src/lib/${packName}/${iconName}.svelte.d.ts`,
      iconDts.replaceAll(`__IconName__`, pascalCase(iconName))
    )
  }

  let readme = fs.readFileSync(`scripts/template-readme.md`, `utf8`)
  for (const [slot, value] of [
    [`{packName}`, packName],
    [`{titleCasedPackName}`, titleCase(packName)],
    [`{fileName}`, iconNames[0]],
    [`{componentName}`, pascalCase(iconNames[0])],
    [/<!-- .+ -->\n/g, ``], // remove HTML comments
  ]) {
    readme = readme.replaceAll(slot, value)
  }
  fs.writeFileSync(`src/lib/${packName}/readme.md`, readme)
  fs.copyFileSync(`license`, `src/lib/${packName}/license`)

  const pkgStructure = fs.readdirSync(`src/lib/${packName}`)
  const expectedFiles = [
    `readme.md`,
    `package.json`,
    `index.js`,
    `index.d.ts`,
    `license`,
  ]
  const missingFiles = expectedFiles.filter(
    (file) => !pkgStructure.includes(file)
  )
  if (missingFiles.length > 0) {
    throw new Error(`Missing files in 'src/lib/${packName}': [${missingFiles}]`)
  }
}

console.log(`Finished building all ${dirs.length} packages!\n`)
