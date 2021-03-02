const { send } = require('process')
const router = require('.')

const userRouter = require('express').Router()
const UserController = require('../controller/UserController')

/*
Router.get / .post / .delete / .patch / .put
*/

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.get('/', UserController.read)
userRouter.put('/:id', UserController.gantipassword)

module.exports = userRouter