const express = require('express')
const router = express.Router()
const ProductsService = require('../../services/products')
const { config } = require('../../config/index')

//cache
const cacheResponse = require('../../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS } = require('../../utils/time')

const productsService = new ProductsService()

router.get('/', async (req, res, next) => {
  //cache
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
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
