const express = require('express')
//devuelve la ruta del directorio actual
const path = require('path')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')

const {
  logErrors,
  clientErrorsHandler,
  errorsHandler,
} = require('./utils/middlewares/errorsHandlers')

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
app.use('/api/products', productsApiRouter)

// redirect
app.get('/', (req, res) => {
  res.redirect('/products')
})

// Errors Handlers
app.use(logErrors)
app.use(clientErrorsHandler)
app.use(errorsHandler)

// Server
const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})
