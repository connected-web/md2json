/*
  Written with compatability to https://github.com/IonicaBizau/json2md v2.0.0 in mind
  @johnbeech - I've already found a bug with the example in the README that duplicates imgs from an array
  See: https://github.com/IonicaBizau/json2md/issues/97
*/

const mapModifiers = {
  default ({ item, name }) {
    delete item.name
    return (item.text) ? { [name]: item.text } : { [name]: item }
  },
  code ({ item, name }) {
    delete item.name
    const content = (item?.text + '').trim().split('\n')
    const language = item.language
    return { [name]: { content, language } }
  }
}

function mapTokens (tokens) {
  const mappedTokens = tokens.map(token => {
    const name = token.name
    const item = { ...token }
    const modifier = mapModifiers[name] ?? mapModifiers.default

    if (typeof modifier === 'function') {
      token = modifier({ item, name })
    }
    return token
  })
  return mappedTokens
}

const groupModifiers = {
  img ({ token, name, index, tokens }) {
    token[name].alt = token[name].alt ?? ''
    skipNextToken({ index, tokens })
    skipNextToken({ index: index + 1, tokens })
    return token
  },
  blockquote ({ token, index, tokens }) {
    skipNextToken({ index, tokens })
    return token
  },
  ol ({ token, name, index, tokens }) {
    const listItems = token[name].trim().split('\n')
    for (let i = 0; i < listItems.length; i++) {
      skipNextToken({ index: index + i, tokens })
    }
    token[name] = listItems
    return token
  },
  ul ({ token, name, index, tokens }) {
    const listItems = token[name].trim().split('\n')
    for (let i = 0; i < listItems.length; i++) {
      skipNextToken({ index: index + i, tokens })
    }
    token[name] = listItems
    return token
  },
  th ({ token, name, index, tokens }) {

  },
  td ({ token, name, index, tokens }) {

  }
}

function skipNextToken ({ index, tokens }) {
  tokens[index + 1].skip = true
}

function groupTokens (tokens) {
  let activeTable, activeRow
  const groupedTokens = tokens.reduce((acc, token, index, list) => {
    if (token.skip) {
      return acc
    }

    const name = Object.keys(token)[0]
    const previous = acc[acc.length - 1] ?? {}
    const text = token[name]

    if (name === 'table') {
      activeTable = { table: { headers: [], rows: [] } }
      acc.push(activeTable)
      return acc
    } else if (name === 'tr') {
      if (activeTable && activeTable.table.headers.length > 0) {
        activeRow = {}
        activeTable.table.rows.push(activeRow)
      }
      return acc
    } else if (name === 'th') {
      activeTable.table.headers.push(text)
      return acc
    } else if (name === 'td') {
      if (activeRow) {
        const columnCount = Object.keys(activeRow ?? {}).length
        const columnKey = activeTable?.table?.headers[columnCount] ?? columnCount
        activeRow[columnKey] = text
      }
      return acc
    }

    const modifier = groupModifiers[name]
    if (typeof modifier === 'function') {
      token = modifier({ token, name, index, tokens })
    }

    if (!token) {
      return acc
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
