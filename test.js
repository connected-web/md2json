const md2json = require('./src/md2json')
const fs = require('fs')

const filename = 'README.md'
const md = fs.readFileSync(filename, 'utf8')
const json = md2json(filename, md)

console.log('Markdown to Json:', json)

fs.writeFileSync('test-output.json', JSON.stringify(json, null, 2), 'utf8')

const a = fs.readFileSync('example-output.json', 'utf8')
const b = JSON.parse(a)
fs.writeFileSync('example-output.json', JSON.stringify(b, null, 2), 'utf8')
