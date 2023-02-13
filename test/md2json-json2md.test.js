const { expect } = require('chai')
const json2md = require('json2md')
const md2json = require('../src/md2json')

const { loadFixture, loadJsonFixture, writeJson } = require('./helpers/fixtures.js')

describe('md2json - outputFormat: json2md', () => {
  it('should convert a small section of md to json and back again using { outputFormat: "json2md" }', async () => {
    const stage1 = [
      { h1: 'Heading 1' },
      { p: 'Basic content' }
    ]
    const stage2 = json2md(stage1)
    console.log('Created md from json:')
    console.log(stage2)

    const stage3 = md2json({ md: stage2, outputFormat: 'json2md' })

    expect(stage1).to.deep.equal(stage3)
  })

  it('should convert a small section of md to json and back again using md2json.json2mdTokens()', async () => {
    const stage1 = [
      { h1: 'Heading 1' },
      { p: 'Basic content' }
    ]
    const stage2 = json2md(stage1)
    console.log('Created md from json:')
    console.log(stage2)

    const stage3 = md2json({ md: stage2, outputFormat: 'json2md' })

    expect(stage1).to.deep.equal(stage3)
  })

  it('should throw an error if supplying an incorrect outputFormat to md2json.json2mdTokens()', async () => {
    try {
      md2json.json2mdTokens({ md: '# Test markdown', outputFormat: 'otherType' })
    } catch (ex) {
      expect(ex.message).to.equal('Option `outputFormat` must only be `default` or `json2md` when using md2json.json2mdTokens')
      return
    }
    throw new Error('Did not expect to reach this condition')
  })

  it('should convert a large json2md file into markdown, and back again', async () => {
    const stage1 = await loadJsonFixture('example-json2md-input.json')

    const stage2 = json2md(stage1)
    console.log('Created md from json:')
    console.log(stage2)
    const stage2comparison = await loadFixture('expected-json2md-output.md')
    expect(stage2).to.equal(stage2comparison, 'Output of json2md did not match fixture on record; has the 3rd party library changed?')

    const stage3 = md2json({ md: stage2, outputFormat: 'json2md' })
    await writeJson('test/fixtures/actual-json2md-md2json-output.json', stage3)

    expect(stage1).to.deep.equal(stage3)
  })
})
