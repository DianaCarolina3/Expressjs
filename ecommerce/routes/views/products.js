const express = require('express')
const router = express.Router()
const ProductsService = require('../../services/products')
const { config } = require('../../config/index')

const productsService = new ProductsService()

router.get('/', async (req, res, next) => {
  const { tags } = req.query

  try {
    // throw new Error('This is an error')

    const products = await productsService.getProducts({ tags })
    res.render('products', { products, dev: config.dev })
  } catch (error) {
    next(error)
  }
})

module.exports = router
