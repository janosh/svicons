#!/usr/bin/env node

/* eslint-disable no-console */

import fs from 'fs'

const dirs = fs.readdirSync(`node_modules/@svg-icons`)

const svgData = {}

for (const dir of dirs) {
  console.log(`Processing ${dir}...`)
  const svgFilenames = fs
    .readdirSync(`node_modules/@svg-icons/${dir}`)
    .filter((str) => str.endsWith(`.svg`))

  const jsonSvgs = Object.fromEntries(
    svgFilenames.map((svg) => {
      let content = fs.readFileSync(
        `node_modules/@svg-icons/${dir}/${svg}`,
        `utf8`
      )
      content = content.replace(/<svg .+?>/, ``).replace(`</svg>`, ``)
      svg = svg.replace(/.svg$/, ``)

      return [svg, content]
    })
  )

  svgData[dir] = jsonSvgs
}

fs.writeFileSync(`src/svgs.json`, JSON.stringify(svgData))

const keyData = Object.fromEntries(
  Object.keys(svgData).map((key) => [key, Object.keys(svgData[key])])
)

fs.writeFileSync(`src/iconKeys.json`, JSON.stringify(keyData))

const lengthData = Object.entries(keyData).map(([pack, keys]) => [
  pack,
  keys.length,
])

fs.writeFileSync(`src/packLengths.json`, JSON.stringify(lengthData))
