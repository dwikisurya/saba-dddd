const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uploadcaptureSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    taskID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    },
    fileName: {
        type: String,
    },
})

const Uploadcapture = mongoose.model('uploadcapture', uploadcaptureSchema)
module.exports = Uploadcapture