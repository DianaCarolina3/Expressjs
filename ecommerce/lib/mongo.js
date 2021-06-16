const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.y9xde.mongodb.net/${DB_NAME}`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true })
    this.dbName = DB_NAME
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) reject(error)

        console.log('Connected succesfully to mongo')
        resolve(this.client.db(this.dbName))
      })
    })
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray()
    })
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) })
    })
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data)
      })
      .then((result) => {
        return result.insertedId
      })
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
      })
      .then((result) => {
        return result.upsertedId
      })
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) })
      })
      .then((result) => {
        return result.deletedCount || id
      })
  }
}

module.exports = MongoLib
