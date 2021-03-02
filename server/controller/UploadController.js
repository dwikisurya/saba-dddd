const { json } = require('body-parser')
const jwt = require('jsonwebtoken')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/images/capture');
    },
    filename: (req, file, cb) => {
        cb(null, 'Pic' + '-' + file.originalname);
    }
});
const upload = multer({ storage }).single('file')

module.exports = class UploadController {

    static post(req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file)
        })
    }

}