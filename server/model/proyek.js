const mongoose = require('mongoose')
const Schema = mongoose.Schema

const proyekSchema = new Schema({
    namaProyek: String,
    provinsi: String,
    imgPath: String,
    created_at: Date,
    updated_at: Date
})

const Proyek = mongoose.model('proyek', proyekSchema)
module.exports = Proyek