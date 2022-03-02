/* eslint-disable no-console */

import fs from 'fs'

const dirs = fs.readdirSync(`node_modules/@svg-icons`)

const iconNames = {}

for (const dir of dirs) {
  console.log(`Fetching metadata for ${dir}...`)
  const svgFilenames = fs
    .readdirSync(`node_modules/@svg-icons/${dir}`)
    .filter((str) => str.endsWith(`.svg`))
    .map((str) => str.slice(0, -4)) // remove .svg

  iconNames[dir] = svgFilenames
}

fs.writeFileSync(
  `src/iconKeys.ts`,
  `export default ${JSON.stringify(iconNames)}`
)

const lengthData = Object.entries(iconNames).map(([pack, keys]) => [
  pack,
  keys.length,
])

fs.writeFileSync(
  `src/packLengths.ts`,
  `export default ${JSON.stringify(lengthData)} as [string, number][]`
)
