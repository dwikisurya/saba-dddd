const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    keterangan: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    durasi: Number,
    perkiraanSelesai: Date,
    created_at: Date,
    updated_at: Date
})

const Tasks = mongoose.model('task', taskSchema)
module.exports = Tasks