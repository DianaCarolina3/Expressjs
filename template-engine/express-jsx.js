/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
//lo pasamos al engine
const fs = require('fs')

function getKeysFromOptions(options) {
  const { settings, _locals, ...objectKeys } = options
  //devuelve array con los keys
  return Object.keys(objectKeys)
}

function getRenderedContent(content, options) {
  const keys = getKeysFromOptions(options)
  let contentString = content.toString()

  for (let key in keys) {
    contentString = contentString.replace(
      new RegExp(`/{${key}/}`, 'gi'),
      options[key]
    )
  }

  return contentString
}

//filePath: (index), options: objeto(json)
function expressJsx(filePath, options, callback) {
  //leer archivo filePath
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(err)
    }

    //traer contenido renderizado
    const rendered = getRenderedContent(content, options)

    //devuelve callback sin error si todo sale bien
    return callback(null, rendered)
  })
}

module.exports = expressJsx
