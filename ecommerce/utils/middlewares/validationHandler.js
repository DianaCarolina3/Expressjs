// //validation schemas

// const { ObjectSchema } = require('yup')

// // function validate(data, schema) {
// //   const { error } = schema.validate(data)

// //   return error
// // }

// // closures
// function validate(schema = ObjectSchema, check = 'body') {
//   return function (req, res, next) {
//     try {
//       schema.validate(req[check])
//     } catch (error) {
//       next(error)
//     }
//   }
// }

// module.exports = validate
