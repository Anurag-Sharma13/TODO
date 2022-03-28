const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./updatedRoutes')




//middlewares
// app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
app.use(router)





app.listen(4000,(req,res)=>{
    console.log("Server is listening on port 4000....")
})
