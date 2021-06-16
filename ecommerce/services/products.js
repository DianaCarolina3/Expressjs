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

  async getProduct({ productID }) {
    const products = await this.mongoDB.get(this.collection, productID)
    return products || []
  }

  async createProduct({ product }) {
    const products = await this.mongoDB.create(this.collection, product)
    return products || []
  }

  async upgradeProduct({ productID, atributes }) {
    const products = await this.mongoDB.update(
      this.collection,
      productID,
      atributes
    )
    return products || []
  }

  async updateProducts({ productID, atributes }) {
    const products = await this.mongoDB.update(
      this.collection,
      productID,
      atributes
    )
    return products || []
  }

  async deleteProduct({ productID }) {
    const products = await this.mongoDB.delete(this.collection, productID)
    return products || []
  }
}

module.exports = ProductsService
