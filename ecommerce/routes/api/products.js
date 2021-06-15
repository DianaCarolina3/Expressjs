const express = require('express')
const router = express.Router()

const productMock = require('../../utils/mocks/products')

router.get('/', (req, res) => {
  // const { query } = req.query

  res.status(200).json({
    data: productMock,
    message: 'Products listed',
  })
})

router.get('/:productID', (req, res) => {
  // const { productID } = req.params

  res.status(200).json({
    data: productMock[0],
    message: 'Products retrieved',
  })
})

router.post('/', (req, res) => {
  res.status(201).json({
    data: productMock[0],
    message: 'Products listed',
  })
})

router.put('/:productID', (req, res) => {
  // const { productID } = req.params

  res.status(200).json({
    data: productMock,
    message: 'Products updated',
  })
})

router.delete('/:productID', (req, res) => {
  // const { productID } = req.params

  res.status(200).json({
    data: productMock,
    message: 'Products deleted',
  })
})

module.exports = router
