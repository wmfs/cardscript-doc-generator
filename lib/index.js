const examples = require('@wmfs/cardscript-examples')
const snippets = require('./snippets')
const stopText = require('./stop-text')
// const getPackageInfo = require('./get-package-info')

const ejs = require('ejs')
const path = require('upath')
const cardscriptSchema = require('@wmfs/cardscript-schema')
const fs = require('fs')

module.exports = function (options) {
  const ctx = cardscriptSchema.getSimpleManifest()
  ctx.simpleExample = JSON.stringify(examples.simple, null, 2)
  ctx.simpleSetExample = JSON.stringify(examples.set, null, 2)
  ctx.expressionExample = JSON.stringify(examples.expression, null, 2)
  ctx.stopText = stopText
  // ctx.packages = getPackageInfo()
  ctx.packages = {}

  // Add example snippets
  ctx.actions.forEach(
    (element) => {
      element.example = JSON.stringify(snippets[element.type], null, 2)
    }
  )
  ctx.containers.forEach(
    (element) => {
      element.example = JSON.stringify(snippets[element.type], null, 2)
    }
  )
  ctx.elements.forEach(
    (element) => {
      element.example = JSON.stringify(snippets[element.type], null, 2)
    }
  )
  ctx.inputs.forEach(
    (element) => {
      element.example = JSON.stringify(snippets[element.type], null, 2)
    }
  )

  ejs.renderFile(
    path.resolve(__dirname, './template.md.ejs'),
    ctx,
    {},
    (err, str) => {
      if (err) {
        console.error(err)
      } else {
        fs.writeFileSync(
          path.join(options.rootDir, 'README.md'),
          str
        )
      }
    }
  )
}
