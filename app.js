const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./src/routes/updatedRoutes')





//middlewares

app.use(bodyParser.json())
app.use(router)




//app running on the server
app.listen(4000,(req,res)=>{
    console.log("Server is listening on port 4000....")
})
