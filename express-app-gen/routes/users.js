/* eslint-disable no-unused-vars */
var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({
    info: {
      nombre: 'Diana Carolina',
      apellido: 'Campuzano Garzon',
      edad: '17 años',
    },
    hobbies: {
      comer: 'mariscos',
      fueraDeCasa: 'montar bicicleta',
      dentroDeCasa: 'estar en familia',
    },
  })
})

module.exports = router
