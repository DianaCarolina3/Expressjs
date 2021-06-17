const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.y9xde.mongodb.net/${DB_NAME}`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    this.dbName = DB_NAME
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect()
        console.log('Connected successfully to mongo')
        MongoLib.connection = this.client.db(this.dbName)
      } catch (error) {
        console.log(error)
      }
    }
    return MongoLib.connection
  }
  async getAll(collection, query) {
    return await this.connect().then((db) => {
      return db.collection(collection).find(query).toArray()
    })
  }

  async get(collection, id) {
    return await this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) })
    })
  }

  async create(collection, data) {
    return await this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data)
      })
      .then((result) => {
        return result.insertedId
      })
  }

  async update(collection, id, data) {
    return await this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
      })
      .then((result) => result.upsertedId || id)
  }

  async delete(collection, id) {
    return await this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) })
      })
      .then((result) => {
        return result.deletedCount || id
      })
  }
}

module.exports = MongoLib
