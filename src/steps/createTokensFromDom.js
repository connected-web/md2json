function createTokensFromDom ($dom) {
  const $items = $dom('*')
  const items = [...$items.map((i, el) => {
    const $el = $dom(el)
    const token = {
      name: el.name
    }
    const text = $el.text()
    if (text) {
      token.text = text
    }
    if ($el.attr('alt')) {
      token.alt = $el.attr('alt')
    }
    if ($el.attr('src')) {
      token.source = $el.attr('src')
    }
    if ($el.attr('title')) {
      token.title = $el.attr('title')
    }
    return token
  })]
  return items
}

module.exports = createTokensFromDom
