const fs = require('fs/promises')
const path = require('path')

async function loadFixture (fixture) {
  const fixturePath = path.join(__dirname, '../fixtures', fixture)
  return fs.readFile(fixturePath, 'utf8')
}

async function loadJsonFixture (fixture) {
  const body = await loadFixture(fixture)
  return JSON.parse(body)
}

async function writeJson (filename, data) {
  await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8')
}

async function writeText (filename, data) {
  await fs.writeFile(filename, data, 'utf8')
}

module.exports = { loadFixture, loadJsonFixture, writeJson, writeText }
