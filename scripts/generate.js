const path = require('path')
const generator = require('./../lib')

console.log('Generate README.md for Cardscript...')

generator({ rootDir: path.resolve(__dirname, './../dist') })
