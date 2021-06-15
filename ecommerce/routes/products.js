const express = require('express')
const router = express.Router()

const productsMocks = require('../utils/mocks/products')

router.get('/', (req, res) => {
  res.render('products', { productsMocks })
})

module.exports = router
