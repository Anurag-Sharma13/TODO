const { query } = require('express')
const express = require('express')
const taskRoutes = express.Router()
const authenticate = require('../middlewares/auth')
const {tasks,createTask,changeTask,deleteTask} = require('../controllers/task')





//Middleware
taskRoutes.use(authenticate)


//Tasks Routers
taskRoutes.get('/',tasks)
taskRoutes.post('/',createTask)
taskRoutes.put('/:id',changeTask)
taskRoutes.delete('/:id',deleteTask)

module.exports = taskRoutes