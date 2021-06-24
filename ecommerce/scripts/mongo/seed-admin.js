const bcrypt = require('bcrypt')
const chalk = require('chalk')
const MongoLib = require('../../lib/mongo')
const { config } = require('../../config')
//creacion de usuario Admin

//construye usuario
function buildAdminUsername(password) {
  return {
    password,
    username: config.password.authAdminUser,
    email: config.password.authAdminEmail,
  }
}

//busqueda de usuario
async function hasAdminUser(mongoDB) {
  const adminUser = await mongoDB.getAll('users', {
    username: config.password.authAdminUser,
  })

  return adminUser && adminUser.length
}

//crea usuario con password hashed
async function createAdminUser(mongoDB) {
  let saltRounds = 10

  const salt = await bcrypt.genSaltSync(saltRounds)

  const hashedPassword = await bcrypt.hash(
    config.password.authAdminPassword,
    salt
  )

  const userId = await mongoDB.create(
    'users',
    buildAdminUsername(hashedPassword)
  )
  return userId
}

//comprobacion
async function seedAdmin() {
  try {
    const mongoDB = new MongoLib()

    if (await hasAdminUser(mongoDB)) {
      //si usuario existe se sale cierra consola
      console.log(chalk.yellow('Admin user already exists'))
      return process.exit(1)
    } else {
      //si usuario no existe lo crea
      const adminUserID = await createAdminUser(mongoDB)
      console.log(chalk.green('Admin user created wit id:', adminUserID))
      return process.exit(0)
    }
  } catch (error) {
    console.log(chalk.red(error))
    process.exit(1)
  }
}

seedAdmin()
