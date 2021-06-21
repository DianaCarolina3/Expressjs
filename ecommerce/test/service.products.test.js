/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert')
const proxyquire = require('proxyquire')

const {
  getAllStub,
  createStub,
  MongoLibMock,
} = require('../utils/mocks/mongoLib')
const {
  products,
  filteredProductsMock,
} = require('../utils/mocks/productsMocks')

describe('services - products', () => {
  const ProductsService = proxyquire('../services/products', {
    '../lib/mongo': MongoLibMock,
  })

  const productsService = new ProductsService()

  describe('when getProducts method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await productsService.getProducts({})
      assert.strictEqual(getAllStub.called, true)
    })

    it('should return an array of products', async () => {
      const result = await productsService.getProducts({})
      assert.deepStrictEqual(result, products)
    })
  })

  describe('when getProducts method is called with tags', async () => {
    const result = await productsService.getProducts({ tags: ['expensive'] })
    const tagQuery = { tags: { $in: ['expensive'] } }
    assert.strictEqual(result, tagQuery, true)
  })
})
