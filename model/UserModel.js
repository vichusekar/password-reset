const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: { type: String, requird: true },

    email: { type: String, required: true },

    password: { type: String, required: true }

}, { collection: 'users', versionKey: false })

let UserModel = mongoose.model('users', UserSchema)

module.exports = { UserModel }