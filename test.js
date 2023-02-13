
const md2json = require('./')
const output = md2json({ markdown: '# Hello world', outputFormat: 'json2md' })
console.log('Output:', { output })
