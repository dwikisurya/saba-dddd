const { send } = require('process')
const router = require('.')

const taskRouter = require('express').Router()
const TaskController = require('../controller/TaskController')

/*
Router.get / .post / .delete / .patch / .put
*/

taskRouter.post('/tambah', TaskController.tambah)
taskRouter.get('/', TaskController.read)
taskRouter.put('/:id', TaskController.update)
taskRouter.delete('/:id', TaskController.delete)
taskRouter.put('/status/:id', TaskController.updateStatus)


module.exports = taskRouter