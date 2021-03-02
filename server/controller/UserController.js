const User = require('../model/user')
const { json } = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = class UserController {

    static register(req, res) {
        const userName = req.body.userName
        const fullName = req.body.fullName
        const password = req.body.password
        const pathImg = req.body.pathImg

        User.create({
            fullName: fullName,
            userName: userName,
            password: password,
            pathImg: pathImg
        }).then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        })
    }

    static login(req, res) {
        const userName = req.body.userName
        const password = req.body.password
        User.findOne({
            userName: userName
        }).then(result => {
            if (result) {
                // Compare Hash
                bcrypt.compare(password, result.password)
                    .then(isValid => {
                        if (isValid) {
                            const token = jwt.sign({ id: result._id, namaUser: result.userName }, process.env.SECRET)
                            res.status(200).json({ token })
                        } else {
                            res.status(403).json({ msg: 'Email / Password Salah' })
                        }
                    })
            } else {
                //Kalo gak ketemu
                res.status(403).json({ msg: 'Email / Password Salah' })
            }


        }).catch(err => {
            res.status(500).json(err)
        })
    }

    // Baca Semua Data
    static read(req, res) {
        User.find()
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json(err)
            })
    }

    // Ganti Pass
    static gantipassword(req, res) {
        const id = req.params.id
        const passwordbaru = req.body.password

        const hashedPassword = bcrypt.hashSync(passwordbaru, 10)

        const dataupdate = {
            password: hashedPassword
        }
        User.findByIdAndUpdate(id, dataupdate, { new: true }, function (err, docs) {
            if (err) {
                console.log(err)
                res.status(500).send(err);
            }
            else {
                res.status(200).send(docs)
            }
        })
    }

}