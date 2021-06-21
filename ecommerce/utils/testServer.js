const express = require('express')
const supertest = require('supertest')

//la ruta de pasamos la app para hacer el test
function testServer(route) {
  const app = express()
  route(app)
  return supertest(app)
}
module.exports = testServer
