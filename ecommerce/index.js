const express = require('express')
//devuelve la ruta del directorio actual
const path = require('path')
const app = express()

const productsRouter = require('./routes/products')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/products', productsRouter)

const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})
