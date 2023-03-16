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

- Default example output: [`examples/example-output.json`](./examples/example-output.json)
- Default tokens output: [`examples/example-output-tokens.json`](./examples/example-output-tokens.json)
- json2md tokens output: [`examples/example-output-json2md.json`](./examples/example-output-json2md.json)
- Test output: [`examples/test-output.json`](./examples/test-output.json)

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

- `{ outputFormat: 'default' }` : Empty string will default to default - a nested structure of markdown as JSON
- `{ outputFormat: 'json2md' }` : Token format compatable with [IonicaBizau/json2md ](https://github.com/IonicaBizau/json2md) (npm: [json2md](https://www.npmjs.com/package/json2md))

## Tokens

```js
const md2json = require('@connected-web/md2json')
const tokens = md2json.tokens('# Heading\n\nContent\n\n## Heading 1.1')
console.log(tokens)
```

Output:
```json
[
  {
    "name": "h1",
    "text": "Heading"
  },
  {
    "name": "p",
    "text": "Content"
  },
  {
    "name": "h2",
    "text": "Heading 1.1"
  }
]
```

## Tokens for json2md 

Instead of using the `outputFormat: json2md` option - which is compatable with [IonicaBizau/json2md ](https://github.com/IonicaBizau/json2md) (npm: [json2md](https://www.npmjs.com/package/json2md)), you can directly call this method:

```js
const md2json = require('@connected-web/md2json')
const tokens = md2json.json2mdTokens('# Heading\n\nContent\n\n## Heading 1.1')
console.log(tokens)
```

Output:
```json
[
  {
    "h1": "Heading"
  },
  {
    "p": "Content"
  },
  {
    "h2": "Heading 1.1"
  }
]
```

You can then feed these tokens back into `json2md` to create markdown again.

Not all formats and formatting are supported; this isn't guarenteed as a fully backwards compatable transformation - but please [raise an issue](https://github.com/connected-web/md2json/issues/new) with an example.

## Approach

- Format parameters
- Render Markdown as HTML
- Create DOM from Markdown
- Create Tokens in the form: `{ name: el.tagName, text: el.text }`
- Parse Tokens into Hierarchy
- Return JSON hierarchy

## Known Issues

- Inline formats not fully supported, e.g.:
  - **bold** and *italic* text will be reduced to plain text
  - the markdown equivalent of a `<code>code block</code>` will duplicate the code text into a new block

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

- Add options to support json2md compatible output
- Support a broader range of HTML tokens, including blockquote, img, code, table, tr, th, td

### 1.2.0

- Fix failing tests based on `marked` interface
- Add PR checking to project

### 1.1.0

- Add `.tokens(markdown)` method to API

### 1.0.0

- First version ready for release
- Not perfect, but hopefully something people can work with
