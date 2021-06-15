/* eslint-disable no-unused-vars */
const productsMocks = require('../utils/mocks/products')

class ProductsService {
  constructor() {}

  getProducts({ tags }) {
    return Promise.resolve(productsMocks)
  }

  getProduct({ productID }) {
    return Promise.resolve(productsMocks[0])
  }

  createProduct({ product }) {
    return Promise.resolve(productsMocks[0])
  }

  upgradeProduct({ productID, product }) {
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
