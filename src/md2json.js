const $createDomFromMarkdown = require('./steps/createDomFromMarkdown')
const createTokensFromDom = require('./steps/createTokensFromDom')
const throwAwayInvalidTokens = require('./steps/throwAwayInvalidTokens')
const parseTokensIntoHierarchy = require('./steps/parseTokensIntoHierarchy')

function md2json (title, md) {
  const $dom = $createDomFromMarkdown(md)
  const tokens = createTokensFromDom($dom)
  const tokensOfInterest = throwAwayInvalidTokens(tokens)
  const json = parseTokensIntoHierarchy(title, tokensOfInterest)

  return json
}

module.exports = md2json
