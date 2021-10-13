function throwAwayInvalidTokens(tokens) {
  const lineTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'pre']
  const structuralTags = ['ul', 'ol']
  const tokensOfInterest = tokens.map(item => {
    if (lineTags.includes(item.name)) {
      return item
    } else if(structuralTags.includes(item.name)) {
      return { name: item.name }
    } else {
      return false
    }
  }).filter(n => n)
  return tokensOfInterest
}

module.exports = throwAwayInvalidTokens
