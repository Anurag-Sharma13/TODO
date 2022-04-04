const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const taskRoutes = require('./src/routes/taskRouter')
const userRoutes = require('./src/routes/userRouter')





//middlewares

app.use(bodyParser.json())
app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)

//Handeling the error through middlewares
app.use((err, req, res, next) => {
    if(err.statusCode && err.statusCode !== 500) {
        res.status(err.statusCode).send(err)
        return
    }
    res.status(500).json({
        message: 'internal server error',
        error: err.message
    })
})

//app running on the server
app.listen(4000,(req,res)=>{
    console.log("Server is listening on port 4000....")
})
