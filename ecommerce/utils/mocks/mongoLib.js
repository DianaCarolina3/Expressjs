const { products, filteredProductsMock } = require('./productsMocks')
const sinon = require('sinon')

const getAllStub = sinon.stub()
//simulacion del tag que se le pasa
const tagQuery = { tags: { $in: ['expensive'] } }

//cunado se pase con product debe resolver los productos
getAllStub.withArgs('products').resolves(products)
//cunado se pase con product y tags debe resolver los tags
getAllStub
  .withArgs('products', tagQuery)
  .resolves(filteredProductsMock('expensive'))

const createStub = sinon.stub().resolves('5358638568368399')

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query)
  }

  create(collection, data) {
    return createStub(collection, data)
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock,
}
