const { send } = require('process')
const router = require('.')

const proyekRouter = require('express').Router()
const ProyekController = require('../controller/ProyekController')

/*
Router.get / .post / .delete / .patch / .put
*/

proyekRouter.post('/tambah', ProyekController.tambah)
proyekRouter.get('/', ProyekController.read)
proyekRouter.put('/:id', ProyekController.update)
proyekRouter.delete('/:id', ProyekController.delete)

module.exports = proyekRouter