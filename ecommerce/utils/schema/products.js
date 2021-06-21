// const productsIdSchema = object().shape({
//   id: string().matches('^[a-zA-Z0-9]{24}$'),
// })

// const createProductSchema = object().shape({
//   name: string().max(50).required(),
//   price: number().min(1).max(10000000),
//   image: string().required,
// })

// const updateProductSchema = object().shape({
//   name: string().max(50),
//   price: number().min(1).max(10000000),
//   image: string(),
// })

// module.exports = {
//   productsIdSchema,
//   createProductSchema,
//   updateProductSchema,
// }
