const { query } = require('express')
const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const { pool } = require('../database/config/connection')
const authenticate = require('../Middlewares/auth')
const { createToken } = require('../utils/utils')
const {regSchema,logSchema} = require('../utils/Joi-Validation')
const {validate} = require('express-validation')
const {register,login,tasks,createTask,changeTask,deleteTask} = require('../controllers/controller')





//User Routers
router.post('/register', validate(regSchema),register)
router.post('/login',validate(logSchema),login)


//Tasks Routers
router.get('/tasks',authenticate,tasks)
router.post('/create-task',authenticate,createTask)
router.post('/change-task/:id',authenticate,changeTask)
router.delete('/delete-task/:id',authenticate,deleteTask)




//Handeling the error through middlewares
router.use((err, req, res, next) => {
    if(err.statusCode && err.statusCode !== 500) {
        res.status(err.statusCode).send(err)
        return
    }
    res.status(500).json({
        message: 'internal server error',
        error: err.message
    })
})




module.exports = router