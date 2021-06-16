/* eslint-disable no-unused-vars */
const productsMocks = require('../utils/mocks/products')
const MongoLib = require('../lib/mongo')

class ProductsService {
  constructor() {
    this.collection = 'products'
    this.mongoDB = new MongoLib()
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const products = await this.mongoDB.getAll(this.collection, query)
    return products || []
  }

  getProduct({ productID }) {
    return Promise.resolve(productsMocks[0])
  }

  createProduct({ product }) {
    return Promise.resolve(productsMocks[0])
  }

  upgradeProduct({ productID, atributes }) {
    return Promise.resolve(productsMocks[0])
  }

  updateProducts({ productID, product }) {
    return Promise.resolve(productsMocks[0])
  }

  deleteProduct({ productID }) {
    return Promise.resolve(productsMocks[0])
  }
}

module.exports = ProductsService
