const task = require('../model/tasks')
const { json } = require('body-parser')
const jwt = require('jsonwebtoken')

module.exports = class TaskController {
    // Tambah data
    static tambah(req, res) {
        const { userID, keterangan, durasi, perkiraanSelesai } = req.body
        const created_at = Date.now()
        const status = 'Dikerjakan'
        task.create({
            userID, keterangan, durasi, status, perkiraanSelesai, created_at
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
        task.findByIdAndDelete(id)
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

        const dataupdate = {
            keterangan: req.body.keterangan,
            status: req.body.status,
            filepath: req.body.filepath,
            updated_at: updated_at
        }
        task.findByIdAndUpdate(id, dataupdate, { new: true }, function (err, docs) {
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

        task.find()
            .populate({
                path: 'userID',
                select: 'userName -_id'
            })
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json(err)
            })
    }

    static updateStatus(req, res) {
        const id = req.params.id
        const status = 'Selesai'
        const updated_at = Date.now()

        const dataupdate = {
            status: status,
            updated_at: updated_at
        }

        task.findByIdAndUpdate(id, dataupdate, { new: true }, function (err, docs) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(docs)
            }
        })
    }

}