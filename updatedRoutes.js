const { query } = require('express')
const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const { pool } = require('./connection')
const authenticate = require('./Middlewares/auth')
const { createToken } = require('./utils')





router.post('/register',async (req, res) => {
    const { id,
        email,
        password,
        firstname,
        lastname,
        mobilenumber } = req.body

    try {
        if (id && email && password && firstname && lastname && mobilenumber) {
            const sql = `INSERT INTO users(id,email,password,firstname,lastname,mobilenumber) 
                     VALUES($1,$2,$3,$4,$5,$6) returning *`
            const result = await pool.query(sql, [id, email, password, firstname, lastname, mobilenumber])
            res.status(200).json({ message: 'User has been Registered.', data: result.rows })
            
        }
        else {
            res.status(400).send("Fields cannot be null.")
        }
    }
    catch (error) {
        res.status(500).send(error.message)
    }


})


router.post('/login',async (req, res) => {
    const { email, password } = req.body
    console.log(email,password)
    try{
        if(email && password){
            const sql = `SELECT * FROM users WHERE email=$1 AND password=$2`
            const result =  await pool.query(sql,[email,password])
            res.status(200).json({message:'User Logged In Succesfully.',data:result.rows})
            createToken()
            
        }
        else{
            res.status(404).send(`Fields cannot be empty`)
        }
    }
    catch(error){
        res.status(404).send(`Please provide the right credentials for login.`)
    }
    
})


//Getting all the task with active,completed or with both the status
router.get('/all_task', async (req, res) => {
    console.log('hsjkafh')
    let complete = req.query.complete
    if (!complete) {
        complete = null
    }
    // console.log(complete)
    const sql = `SELECT * FROM tasks WHERE ($1::boolean IS NULL OR complete=$1) AND deleted=false`
    try {
        const result = await pool.query(sql, [complete])
        res.status(200).json({ data: result.rows })
    }
    catch (error) {
        res.status(404).send(error.message)
    }
})


//Creating a new task into the list
router.post('/create',authenticate, async (req, res) => {
    const sql = `INSERT INTO tasks(id,label,complete) VALUES($1,$2,$3) returning *`
    try {
        const { id, label, complete } = req.body
        const result = await pool.query(sql, [id, label, complete])
        res.status(200).json({ message: 'Item Created Successfully.', data: result.rows })
    }
    catch (error) {
        res.status(404).send(error.message)
    }
})



//Deleting a task from the list
router.delete('/delete/:id',authenticate, async (req, res) => {
    const { id } = req.params
    const sql = `UPDATE tasks SET deleted=true WHERE id=$1`
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json({ message: 'Item Deleted Successfully.', data: result.rows })
    }
    catch (error) {
        res.status(404).send(error.message)
    }
})




module.exports = router