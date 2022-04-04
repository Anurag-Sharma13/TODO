const { query } = require('express')
const express = require('express')
const userRoutes = express.Router()
const {regSchema,logSchema} = require('../utils/joi-validation')
const {validate} = require('express-validation')
const {register,login} = require('../controllers/user')



//User Routers
userRoutes.post('/register', validate(regSchema),register)
userRoutes.post('/login',validate(logSchema),login)

module.exports = userRoutes