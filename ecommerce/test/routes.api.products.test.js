/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert')
const proxyquire = require('proxyquire')

//traer Mocks de productos y servicios
const {
  //products,
  ProductsServiceMock,
} = require('../utils/mocks/productsMocks')

//traer servidor de test
const testServer = require('../utils/testServer')

//describir los test
describe('routes - api - products', () => {
  //traigo la ruta a testear
  const route = proxyquire('../routes/api/products', {
    //para esta ruta usa el servicio de mocks
    //valida si recibe y envia datos
    '../../services/products': ProductsServiceMock,
  })

  //servidor de pruebas
  const request = testServer(route)

  describe('GET /products', () => {
    it('should response whit status 200', (done) => {
      request.get('/api/products').expect(200, done)
    })
    //si es json
    it('should response with content type json', (done) => {
      request.get('/api/products').expect('content-type', /json/, done)
    })
    it('should response with not error', (done) => {
      request.get('/api/products').end((err, res) => {
        assert.strictEqual(err, null)
        done()
      })
    })
  })

  describe('POST /products', () => {
    it('should response whit status 201', (done) => {
      request.post('/api/products').expect(201, done)
    })
  })
  it('should response with not error', (done) => {
    request.post('/api/products').end((err, res) => {
      assert.strictEqual(err, null)
      done()
    })
  })
})

//al eliminar autentificacion de usuario funciona
