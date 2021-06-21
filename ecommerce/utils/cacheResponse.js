const { config } = require('../config/index')

function cacheResponse(res, seconds) {
  if (!config.dev) {
    //establece el campo de encabezado HTTP de respuesta
    res.set('Cache-Control', `public, max-age=${seconds}`)
  }
}

module.exports = cacheResponse
