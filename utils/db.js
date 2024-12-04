require('dotenv').config()
const mongoose = require('mongoose')

const MongoUri = process.env.MONGO_URL

const ConnectDb = async () => {
    try {
        await mongoose.connect(MongoUri)
        console.log("Mongodb Connected")
    } catch (error) {
        console.log("Connection failed")
    }
}

module.exports = ConnectDb