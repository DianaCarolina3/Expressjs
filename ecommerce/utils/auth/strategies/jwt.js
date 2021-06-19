const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('boom')
const MongoLib = require('../../../lib/mongo')
const { config } = require('../../../config/index')

passport.use(
  new Strategy(
    {
      //verificacion de secret y bearer token
      secretOrKey: config.password.authJWTSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (tokenPayload, cb) => {
      const mongoDB = new MongoLib()

      try {
        //traer en usuario
        const [user] = await mongoDB.getAll('users', {
          username: tokenPayload.sub,
        })

        if (!user) {
          return cb(boom.unauthorized(), false)
        }

        //si usuario existe devuelve usuario
        return cb(null, user)
      } catch (error) {
        return cb(error)
      }
    }
  )
)
