function parseTokensIntoJson2mdFormat (title, tokens) {
  const mappedTokens = tokens.map(token => ({ [token.name]: token.text }))
  return mappedTokens
}

module.exports = parseTokensIntoJson2mdFormat
