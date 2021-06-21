const express = require('express')
const ProductsService = require('../../services/products')
//const passport = require('passport')

const productsService = new ProductsService()

//JWT strategy
require('../../utils/auth/strategies/jwt')

//invercion de control: la app define la ruta
function productsApi(app) {
  //la ruta define la app
  const router = express.Router()
  app.use('/api/products', router)

  router.get(
    '/',
    //autentificacion para get info
    //passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { tags } = req.query

      try {
        const getAllProducts = await productsService.getProducts({ tags })

        res.status(200).json({
          data: getAllProducts,
          message: 'Products listed',
        })
      } catch (error) {
        next(error)
      }
    }
  )

  router.get(
    '/:productID',
    //autentificacion para get info
    //passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { productID } = req.params

      try {
        const getProduct = await productsService.getProduct({ productID })

        res.status(200).json({
          data: getProduct,
          message: 'Product retrieved',
        })
      } catch (error) {
        next(error)
      }
    }
  )

  router.post(
    '/',
    //autentificacion para publicar post
    //passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { body: product } = req

      try {
        const postProduct = await productsService.createProduct({ product })

        res.status(201).json({
          data: postProduct,
          message: 'Products listed',
        })
      } catch (error) {
        next(error)
      }
    }
  )

  router.put(
    '/:productID',
    //autentificacion para update
    //passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { productID } = req.params
      const { body: product } = req

      try {
        const putProduct = await productsService.updateProducts({
          productID,
          product,
        })

        res.status(200).json({
          data: putProduct,
          message: 'Products updated',
        })
      } catch (error) {
        next(error)
      }
    }
  )

  router.patch(
    '/:productID',
    //autentificacion para update
    //passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { productID } = req.params
      const { body: atributes } = req

      try {
        const patchProduct = await productsService.upgradeProduct({
          productID,
          atributes,
        })

        res.status(200).send({
          data: patchProduct,
          message: 'product upgraded',
        })
      } catch (error) {
        next(error)
      }
    }
  )

  router.delete(
    '/:productID',
    //autentificacion para delete
    //passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { productID } = req.params

      try {
        const deleteProduct = await productsService.deleteProduct({ productID })

        res.status(200).json({
          data: deleteProduct,
          message: 'Product deleted',
        })
      } catch (error) {
        next(error)
      }
    }
  )
}

module.exports = productsApi
