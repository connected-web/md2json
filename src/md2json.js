const $createDomFromMarkdown = require('./steps/createDomFromMarkdown')
const createTokensFromDom = require('./steps/createTokensFromDom')
const formatValidTokens = require('./steps/formatValidTokens')
const parseTokensIntoHierarchy = require('./steps/parseTokensIntoHierarchy')
const parseTokensIntoJson2mdFormat = require('./steps/parseTokensIntoJson2mdFormat')

const outputFormats = {
  default: parseTokensIntoHierarchy,
  json2md: parseTokensIntoJson2mdFormat
}

function formatParams (params) {
  const options = params.pop()
  const md = options.md ?? options.markdown ?? options
  const title = params.pop() || options.title || ''
  const outputFormat = params.pop() ?? options.outputFormat ?? 'default'
  return {
    md,
    title,
    outputFormat
  }
}

function md2json (...params) {
  const { md, title, outputFormat } = formatParams(params)
  const $dom = $createDomFromMarkdown(md)
  const tokens = createTokensFromDom($dom)
  const tokensOfInterest = formatValidTokens(tokens)

  const outputStep = outputFormats[outputFormat] ?? outputFormats.default
  const json = outputStep(title, tokensOfInterest)

  return json
}

md2json.tokens = (...params) => {
  const { md } = formatParams(params)
  const $dom = $createDomFromMarkdown(md)
  const tokens = createTokensFromDom($dom)
  const tokensOfInterest = formatValidTokens(tokens)
  return tokensOfInterest
}


md2json.json2mdTokens = (...params) {
  const { md, title, outputFormat } = formatParams(params)
  const $dom = $createDomFromMarkdown(md)
  const tokens = createTokensFromDom($dom)
  const tokensOfInterest = formatValidTokens(tokens)

  if (outputFormat !== 'default' && outputFormat !== 'json2md') {
    throw new Error('Option `outputFormat` must only be `default` or `json2md` when using md2json.json2mdTokens')
  }

  const json = parseTokensIntoJson2mdFormat(title, tokensOfInterest)

  return json
}

module.exports = md2json
