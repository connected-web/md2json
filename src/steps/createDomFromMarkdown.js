const cheerio = require('cheerio')
const marked = require('marked')

function $createDomFromMarkdown(md) {
  const html = marked(md)
  const $dom = cheerio.load(html)
  return $dom
}

module.exports = $createDomFromMarkdown
