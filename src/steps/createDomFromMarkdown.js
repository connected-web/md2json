const cheerio = require('cheerio')
const { marked } = require('marked')

const fs = require('fs')

function $createDomFromMarkdown (md) {
  const html = marked(md)
  fs.writeFileSync('./test-html-out.html', html, 'utf8')
  const $dom = cheerio.load(html)
  return $dom
}

module.exports = $createDomFromMarkdown
