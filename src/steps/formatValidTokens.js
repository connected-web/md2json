function simpleText (item) {
  if (item.text) {
    item.text = item.text.trim()
  }
  if (!item.text) {
    return false
  }
  return item
}

function listItem (item) {
  return item
}

function imageItem (item) {
  return item
}

function tableBlock (item) {
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
  img: imageItem,
  table: tableBlock,
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
  console.log('Tokens of interest:', { tokensOfInterest })
  return tokensOfInterest
}

module.exports = formatValidTokens
