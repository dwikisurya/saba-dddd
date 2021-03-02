const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {
        type: String,
    },
    userName: {
        type: String,
    },
    password: {
        type: String,
        minlength: 6
    },
    pathImg: {
        type: String
    }
})

userSchema.pre('save', async function (next) {
    const hashedPassword = bcrypt.hashSync(this.password, 10)
    this.password = hashedPassword
    next()
})

const User = mongoose.model('user', userSchema)
module.exports = User