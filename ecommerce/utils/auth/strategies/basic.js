//validacion de usuario en db
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('boom')
const bcrypt = require('bcrypt')
const MongoLib = require('../../../lib/mongo')

passport.use(
  new BasicStrategy(async (username, password, callback) => {
    const mongoDB = new MongoLib()

    try {
      //get usesr
      const [user] = await mongoDB.getAll('users', { username })

      //si no existe user no autoriza
      if (!user) {
        return callback(boom.unauthorized(), false)
      }

      //si no existe o no es correcta password no autoriza
      if (!(await bcrypt.compare(password, user.password))) {
        return callback(boom.unauthorized(), false)
      }

      return callback(null, user)
    } catch (error) {
      return callback(error)
    }
  })
)
