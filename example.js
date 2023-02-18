console.log('# md2json Example.js')

const md2json = require('./src/md2json')
const fs = require('fs')

const filename = 'README.md'
const md = fs.readFileSync(filename, 'utf8')

const example1 = md2json('Example 1 - Markdown to JSON', md)

console.log('## Markdown to JSON (structured hierarchy')
console.log('')
console.log('```json')
console.log(JSON.stringify(example1, null, 2))
console.log('```')

fs.writeFileSync('examples/example-output.json', JSON.stringify(example1, null, 2), 'utf8')

const example2 = md2json({ title: 'Example 2 - Markdown to json2md format', markdown: md, outputFormat: 'json2md' })
console.log('Convert markdown into tokens compatable with json2md format:')
fs.writeFileSync('examples/example-output-json2md.json', JSON.stringify(example2, null, 2), 'utf8')

console.log('## Markdown to JSON Tokens (json2md format)')
console.log('')
console.log('```json')
console.log(JSON.stringify(example2, null, 2))
console.log('```')

const example3 = md2json.tokens({ title: 'Example 3 - Token Array', markdown: md })
console.log('Convert markdown into array of tokens')
fs.writeFileSync('examples/example-output-tokens.json', JSON.stringify(example3, null, 2), 'utf8')

console.log('## Markdown to JSON Tokens (token array')
console.log('')
console.log('```json')
console.log(JSON.stringify(example3, null, 2))
console.log('```')
