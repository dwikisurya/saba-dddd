const proyek = require('../model/proyek')
const { json } = require('body-parser')
const jwt = require('jsonwebtoken')

module.exports = class proyekController {
    // Tambah data
    static tambah(req, res) {
        const { namaProyek, provinsi } = req.body
        const created_at = Date.now()
        proyek.create({
            namaProyek, provinsi, created_at
        }).then((result) => {
            res.status(201).json(result)
            console.log(result)
        }).catch((err) => {
            res.status(500).json(err)
        })
    }

    // Delete data , dapat dari _id
    static delete(req, res) {
        const id = req.params.id
        proyek.findByIdAndDelete(id)
            .exec()
            .then((result) => {
                res.status(303).json({ msg: 'Data Berhasil Dihapus' })
            }).catch((err) => {
                res.status(500).json(err)
            })
    }

    // Update data , dari _id
    static update(req, res) {
        const id = req.params.id
        const updated_at = Date.now()
        console.log(req.body.imgPath)
        const dataupdate = {
            imgPath: req.body.imgPath,
            updated_at: updated_at
        }
        proyek.findByIdAndUpdate(id, dataupdate, { new: true }, function (err, docs) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send(docs)
            }
        })
    }

    // Baca Semua Data
    static read(req, res) {

        proyek.find()
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json(err)
            })
    }


}