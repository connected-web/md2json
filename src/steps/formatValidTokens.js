function simpleText (item) {
  return item
}

function listItem (item) {
  return item
}

function image (item) {
  return item
}

function table (item) {
  return item
}

function listBlock (item) {
  return item
}

function throwAwayItem () {
  return false
}

const actions = {
  h1: simpleText,
  h2: simpleText,
  h3: simpleText,
  h4: simpleText,
  h5: simpleText,
  p: simpleText,
  pre: simpleText,
  blockquote: simpleText,
  li: listItem,
  img: image,
  table: table,
  ul: listBlock,
  ol: listBlock,
  default: throwAwayItem
}

function formatValidTokens (tokens) {
  const tokensOfInterest = tokens.map(item => {
    const action = actions[item.name] ?? actions.default
    const result = action(item)
    return result
  }).filter(n => n)
  return tokensOfInterest
}

module.exports = formatValidTokens
