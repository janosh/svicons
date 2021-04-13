#!/usr/bin/env node

/* eslint-disable no-console */

import fs from 'fs'

const dirs = fs.readdirSync(`node_modules/@svg-icons`)

const iconNames = {}

for (const dir of dirs) {
  console.log(`Processing ${dir}...`)
  const svgFilenames = fs
    .readdirSync(`node_modules/@svg-icons/${dir}`)
    .filter((str) => str.endsWith(`.svg`))
    .map((str) => str.replace(/.svg$/, ``))

  iconNames[dir] = svgFilenames
}

fs.writeFileSync(`src/iconKeys.json`, JSON.stringify(iconNames))

const lengthData = Object.entries(iconNames).map(([pack, keys]) => [
  pack,
  keys.length,
])

fs.writeFileSync(`src/packLengths.json`, JSON.stringify(lengthData))