const Router = require('express').Router()
const authCtrl = require('../controller/userCtrl')

// router.post('/register', authCtrl.register)

// router.post('/login', authCtrl.login)

// router.post('/logout', authCtrl.logout)

// router.post('/refresh_token', authCtrl.generateAccessToken)





Router.post('/register', authCtrl.register);
Router.post('/login-user', authCtrl.login);
Router.post('/logout', authCtrl.logout);





module.exports = Router