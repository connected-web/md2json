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
const md2json = require('@connected-web/md2json')
const fs = require('fs')

const filename = 'README.md'
const md = fs.readFileSync(filename, 'utf8')
const json = md2json(filename, md)

console.log('Markdown to Json:', json)
```

## Examples

- Example Output: [`examples/example-output.json`](./examples/example-output.json)
- Test Output: [`examples/test-output.json`](./examples/test-output.json)

## Source only API

```js
md2json(markdown)
```

## Title and source API

```js
md2json(title, markdown)
```

## Options object API
```js
md2json({
  title: 'README.md',
  markdown: '# Heading\n\nContent'
})
```

### Option : `title`

The top level section of the JSON output.

### Option : `markdown` | `md`

The text string representing the markdown to be converted to JSON

### Option : `outputFormat`

The type of formatting to output.

- `{ outputFormat: 'default' }` : Empty string will default to default - nested structure of markdown as JSON
- `{ outputFormat: 'json2md' }` : Token format compatable with [IonicaBizau/json2md ](https://github.com/IonicaBizau/json2md) (npm: [json2md](https://www.npmjs.com/package/json2md))

## Tokens

```js
const tokens = md2json.tokens('# Heading\n\nContent\n\n##Heading 1.1')
console.log(tokens)
```

Output:
```json
[
  { "name": "h1", "text": "Heading" },
  { "name": "p", "text": "Content"},
  { "name": "h2", "text": "Heading 1.1"}
]
```

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

## Changelog

### 1.3.0

- Add option to support json2md compatible output

### 1.2.0

- Fix failing tests based on `marked` interface
- Add PR checking to project

### 1.1.0

- Add `.tokens(markdown)` method to API

### 1.0.0

- First version ready for release
- Not perfect, but hopefully something people can work with
