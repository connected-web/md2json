const md2json = require('./src/md2json')
const fs = require('fs')

const filename = 'README.md'
const md = fs.readFileSync(filename, 'utf8')

const example1 = md2json('Example 1 - Markdown to JSON', md)
console.log('Markdown to JSON:', example1)
fs.writeFileSync('examples/example-output.json', JSON.stringify(example1, null, 2), 'utf8')

const example2 = md2json({ title: 'Example 2 - Markdown to json2md format', markdown: md, outputFormat: 'json2md' })
console.log('Markdown to json2md format:')
fs.writeFileSync('examples/example-output-json2md.json', JSON.stringify(example2, null, 2), 'utf8')
