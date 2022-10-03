/* eslint-disable no-console */

// Create package.json, index.js, type declarations files for each icon pack.
// Call with `node scripts/build-packages.js`.

import fs from 'fs'

const dirs = fs
  .readdirSync(`src/lib`, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

const upper_first = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
const title_case = (str) => str.split(`-`).map(upper_first).join(` `)
const pascal_case = (str) => str.split(`-`).map(upper_first).join(``)

for (const pack_name of dirs) {
  console.log(`Creating package ${pack_name}...`)

  const icon_files = fs
    .readdirSync(`src/lib/${pack_name}/`)
    .filter((file) => file.endsWith(`.svelte`))

  if (icon_files[0].includes(`/`)) {
    throw `${icon_files[0]} should be file-name only and not contain slashes`
  }

  const icon_names = icon_files
    .filter((str) => str.endsWith(`.svelte`) && !str.match(/^\d/)) // discard files starting with digits
    .map((str) => str.split(`.`)[0]) // keep only the filename without extension

  const index_exports = icon_names
    .map(
      (name) =>
        `export { default as ${pascal_case(name)} } from './${name}.svelte'`
    )
    .join(`\n`)
  fs.writeFileSync(`src/lib/${pack_name}/index.js`, index_exports)
  fs.writeFileSync(`src/lib/${pack_name}/index.d.ts`, index_exports)

  const pkg = {
    name: `@svicons/${pack_name}`,
    version: `0.1.11`,
    license: `MIT`,
    type: `module`,
    main: `./index.js`,
    svelte: `./index.js`,
    keywords: [`svicons`, `svg`, `icons`, `svelte`, pack_name],
    author: `Janosh Riebesell <janosh.riebesell@gmail.com>`,
    description: `${title_case(
      pack_name
    )} icons available as Svelte components`,
    homepage: `https://npmjs.com/package/@svicons/${pack_name}`,
    repository: `https://github.com/janosh/svicons`,
    publishConfig: {
      access: `public`,
    },
    exports: {
      '.': `./index.js`,
      ...Object.fromEntries(
        icon_files.map((filename) => [`./${filename}`, `./${filename}`])
      ),
    },
  }
  fs.writeFileSync(
    `src/lib/${pack_name}/package.json`,
    JSON.stringify(pkg, null, 2) + `\n`
  )

  const icon_dts = fs.readFileSync(`scripts/template-icon.svelte.d.ts`, `utf8`)
  // create type declaration files for each icon
  for (const icon_name of icon_names) {
    fs.writeFileSync(
      `src/lib/${pack_name}/${icon_name}.svelte.d.ts`,
      icon_dts.replaceAll(`__IconName__`, pascal_case(icon_name))
    )
  }

  let readme = fs.readFileSync(`scripts/template-readme.md`, `utf8`)
  for (const [slot, value] of [
    [`{pack_name}`, pack_name],
    [`{title_cased_pack_name}`, title_case(pack_name)],
    [`{file_name}`, icon_names[0]],
    [`{component_name}`, pascal_case(icon_names[0])],
    [/\s+<!-- .+ -->\n/g, ``], // remove HTML comments
  ]) {
    readme = readme.replaceAll(slot, value)
  }
  fs.writeFileSync(`src/lib/${pack_name}/readme.md`, readme)
  fs.copyFileSync(`license`, `src/lib/${pack_name}/license`)

  const pkg_files = fs.readdirSync(`src/lib/${pack_name}`)
  const expected_files = [
    `readme.md`,
    `package.json`,
    `index.js`,
    `index.d.ts`,
    `license`,
  ]
  const missing_files = expected_files.filter(
    (file) => !pkg_files.includes(file)
  )
  if (missing_files.length > 0) {
    throw new Error(
      `Missing files in 'src/lib/${pack_name}': [${missing_files}]`
    )
  }
}

console.log(`Finished building all ${dirs.length} packages!\n`)
