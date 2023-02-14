/*
  Written with compatability to https://github.com/IonicaBizau/json2md v2.0.0 in mind
  @johnbeech - I've already found a bug with the example in the README that duplicates imgs from an array
  See: https://github.com/IonicaBizau/json2md/issues/97
*/

function mapTokens (tokens) {
  const mappedTokens = tokens.map(token => {
    const name = token.name
    const item = { ...token }
    delete item.name
    return (item.text) ? { [name]: item.text } : { [name]: item }
  })
  return mappedTokens
}

const modifiers = {
  img: ({ token, name, index, tokens }) => {
    token[name].alt = token[name].alt ?? ''
    skipNextToken({ index, tokens })
    skipNextToken({ index: index + 1, tokens })
    return token
  },
  blockquote: ({ token, index, tokens }) => {
    skipNextToken({ index, tokens })
    return token
  },
  ol: ({ token, name, index, tokens }) => {
    const listItems = token[name].trim().split('\n')
    for (let i = 0; i < listItems.length; i++) {
      skipNextToken({ index: index + i, tokens })
    }
    token[name] = listItems
    return token
  },
  ul: ({ token, name, index, tokens }) => {
    const listItems = token[name].trim().split('\n')
    for (let i = 0; i < listItems.length; i++) {
      skipNextToken({ index: index + i, tokens })
    }
    token[name] = listItems
    return token
  }
}

function skipNextToken ({ index, tokens }) {
  tokens[index + 1].skip = true
}

function groupTokens (tokens) {
  const groupedTokens = tokens.reduce((acc, token, index, list) => {
    if (token.skip) {
      return acc
    }

    const name = Object.keys(token)[0]
    const previous = acc[acc.length - 1] ?? {}

    console.log('Group tokens:', { name, previous, token })

    const modifier = modifiers[name]
    if (typeof modifier === 'function') {
      token = modifier({ token, name, index, tokens })
    }

    if (previous[name]) {
      const group = Array.isArray(previous[name]) ? previous[name] : [previous[name]]
      group.push(token[name])
      acc.pop()
      acc.push({ [name]: group })
    } else {
      acc.push(token)
    }
    return acc
  }, [])
  return groupedTokens
}

function parseTokensIntoJson2mdFormat (title, tokens) {
  const mappedTokens = mapTokens(tokens)
  const groupedTokens = groupTokens(mappedTokens)
  return groupedTokens
}

module.exports = parseTokensIntoJson2mdFormat
