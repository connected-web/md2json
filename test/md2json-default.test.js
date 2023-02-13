const { expect } = require('chai')
const md2json = require('../src/md2json')

const { loadFixture, loadJsonFixture, writeJson } = require('./helpers/fixtures.js')

describe('md2json - outputFormat: default', () => {
  it('should convert a small section of md to json', async () => {
    const source = [
      '# Heading',
      'Basic content'
    ].join('\n')
    const actual = md2json(source)
    const expected = {
      title: '',
      content: [],
      sections: [{
        title: 'Heading',
        content: [
          'Basic content'
        ],
        sections: []
      }]
    }
    expect(actual).to.deep.equal(expected)
  })

  it('should convert a small section of md to json passed as an object', async () => {
    const markdown = [
      '# Heading',
      'Basic content'
    ].join('\n')
    const actual = md2json({
      title: 'My Markdown File',
      markdown
    })
    const expected = {
      title: 'My Markdown File',
      content: [],
      sections: [{
        title: 'Heading',
        content: [
          'Basic content'
        ],
        sections: []
      }]
    }
    expect(actual).to.deep.equal(expected)
  })

  it('should convert markdown to json with a title', async () => {
    const filename = 'example-file-input.md'
    const source = await loadFixture('example-file-input.md')
    const expected = await loadJsonFixture('expected-file-output.json')
    const actual = md2json(filename, source)
    await writeJson('examples/example-output.json', actual)
    expect(actual).to.deep.equal(expected)
  })
})
