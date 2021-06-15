const express = require('express')
const app = express()

const engines = require('consolidate')

app.get('/', (req, res) => {
  res.render('index', { hello: 'hola', world: ' mundo' })
})

app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

const server = app.listen(3000, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})
