function createTokensFromDom($dom) {
  const $items = $dom('*')
  const items = [...$items.map((i, el) => {
    const $el = $dom(el)
    return {
      name: el.name,
      text: $el.text()
    }
  })]
  return items
}

module.exports = createTokensFromDom
