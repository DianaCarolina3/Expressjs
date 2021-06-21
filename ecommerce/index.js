/* eslint-disable no-unused-vars */
const express = require('express')
//devuelve la ruta del directorio actual
const path = require('path')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const authApiRouter = require('./routes/api/auth')
const boom = require('boom')
const slash = require('express-slash')
const debug = require('debug')('app:server')

const {
  logErrors,
  wrapErrors,
  clientErrorsHandler,
  errorsHandler,
} = require('./utils/middlewares/errorsHandlers')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

// App
const app = express()

// Statics files
app.use('/static', express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
app.use('/products', productsRouter)
productsApiRouter(app)
app.use('/api/auth', authApiRouter)

// redirect
app.get('/', (req, res) => {
  res.redirect('/products')
})

//error pag 404, ya que ninguna ruta responde
app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload },
    } = boom.notFound()

    res.status(statusCode).json(payload)
  } else {
    res.status(404).render('404')
  }
})

// express slash
app.use(slash())

// Errors Handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorsHandler)
app.use(errorsHandler)

// Server
const server = app.listen(8000, () => {
  debug(`Listening http://localhost:${server.address().port}`)
})
