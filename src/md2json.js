const $createDomFromMarkdown = require('./steps/createDomFromMarkdown')
const createTokensFromDom = require('./steps/createTokensFromDom')
const throwAwayInvalidTokens = require('./steps/throwAwayInvalidTokens')
const parseTokensIntoHierarchy = require('./steps/parseTokensIntoHierarchy')

function formatParams (params) {
  const md = params.pop()
  const title = params.pop() || md.title || ''
  return {
    title,
    md: md.md || md.markdown || md
  }
}

function md2json (...params) {
  const { title, md } = formatParams(params)
  const $dom = $createDomFromMarkdown(md)
  const tokens = createTokensFromDom($dom)
  const tokensOfInterest = throwAwayInvalidTokens(tokens)
  const json = parseTokensIntoHierarchy(title, tokensOfInterest)

  return json
}

module.exports = md2json
