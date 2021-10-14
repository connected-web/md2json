const { expect } = require('chai')
const md2json = require('../')

describe('Markdown 2 Json : Tokens', () => {
  it('should produce an array of tokens from a markdown input', () => {
    const markdown = [
      '# Heading 1',
      'Some content',
      '## Heading 1.1',
      'More content',
      '## Heading 1.2',
      'Even more content'
    ].join('\n')
    const actual = md2json.tokens(markdown)
    const expected = [
      { name: 'h1', text: 'Heading 1' },
      { name: 'p', text: 'Some content' },
      { name: 'h2', text: 'Heading 1.1' },
      { name: 'p', text: 'More content' },
      { name: 'h2', text: 'Heading 1.2' },
      { name: 'p', text: 'Even more content' }
    ]
    expect(actual).to.deep.equal(expected)
  })
})
