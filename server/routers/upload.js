const { send } = require('process')
const router = require('.')

const uploadRouter = require('express').Router()
const UploadController = require('../controller/UploadController')

/*
Router.get / .post / .delete / .patch / .put
*/

uploadRouter.post('/tambah', UploadController.post)

module.exports = uploadRouter