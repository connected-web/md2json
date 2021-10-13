function parseTokensIntoHierarchy(title, tokens) {
  const operations = {
    'h1': createSection,
    'h2': createSection,
    'h3': createSection,
    'h4': createSection,
    'h5': createSection,
    'p': addContent,
    'pre': addContent,
    'ul': createList,
    'ol': createList,
    'li': addItemToList,
    default: addContent
  }

  function currentSection(sectionPath) {
    return sectionPath[sectionPath.length - 1]
  }

  function createSection(sectionPath, section, { name, text }) {
    const level = Number.parseInt(name.charAt(1))
    const newSection = {
      title: text,
      content: [],
      sections: []
    }
    while (sectionPath.length > level) {
      sectionPath.pop()
    }
    section = currentSection(sectionPath)
    section.sections.push(newSection)
    sectionPath.push(newSection)
  }
  
  function addContent(sectionPath, section, { name, text }) {
    const lines = text.split('\n')
    const content = lines.length > 1 ? lines : lines[0]
    section.content.push(content)
  }
  
  let currentList
  function createList(sectionPath, section, { name, text }) {
    currentList = []
    section.content.push(currentList)
  }
  
  function addItemToList(sectionPath, section, { name, text }) {
    currentList = currentList || []
    currentList.push(text)
  }

  const rootSection = {
    title,
    content: [],
    sections: []
  }

  const sectionPath = [rootSection]
  tokens.forEach((token) => {
    const section = currentSection(sectionPath)
    const operation = operations[token.name] || operations.default
    operation(sectionPath, section, token)
  })

  return rootSection
}

module.exports = parseTokensIntoHierarchy
