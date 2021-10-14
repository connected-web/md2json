const fs = require('fs/promises')
const path = require('path')
const { expect } = require('chai')
const md2json = require('../')

async function loadFixture (fixture) {
  const fixturePath = path.join(__dirname, 'fixtures', fixture)
  return fs.readFile(fixturePath, 'utf8')
}

async function loadJsonFixture (fixture) {
  const body = await loadFixture(fixture)
  return JSON.parse(body)
}

describe('Markdown 2 Json', () => {
  it('should convert markdown to json', async () => {
    const filename = 'example-file-input.md'
    const source = await loadFixture('example-file-input.md')
    const expected = await loadJsonFixture('expected-file-output.json')
    const actual = md2json(filename, source)
    await fs.writeFile('output.json', JSON.stringify(actual, null, 2), 'utf8')
    expect(actual).to.deep.equal(expected)
  })
})
