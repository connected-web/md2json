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

## md2json API

### Source only

```js
md2json(md)
```

### Title and source

```js
md2json(title, md)
```

### Options object
```js
md2json({
  title: 'README.md',
  markdown: '# Heading\n\nContent'
})
```

### Option : title

The top level section of the JSON output.

### Option : markdown | md

The text string representing the markdown to be converted to JSON

## Approach

- Format parameters
- Render Markdown as HTML
- Create DOM from Markdown
- Create Tokens in the form: `{ name: el.tagName, text: el.text }`
- Parse Tokens into Hierarchy
- Return JSON hierarchy

## Licenses

Released under ISC.

### Dependencies

- marked
- cheerio

### Development tools

- mocha
- chai
- standard
