# Markdown 2 Json

A functional library that takes a markdown body; and tries to create a JSON representation of the document.

## Supports

- Headings
- Lists
- Paragraphs

## Usage

Install:
- `npm install @connected-web/md2json`

```js
const md2json = require('./src/md2json')
const fs = require('fs')

const filename = 'README.md'
const md = fs.readFileSync(filename, 'utf8')
const json = md2json(filename, md)

console.log('Markdown to Json:', json)
```
