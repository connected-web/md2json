function parseTokensIntoJson2mdFormat (title, tokens) {
  const mappedTokens = tokens.map(token => {
    const name = token.name
    const item = { ...token }
    delete item.name
    return (item.text) ? { [name]: item.text } : { [name]: item }
  })
  return mappedTokens
}

module.exports = parseTokensIntoJson2mdFormat
