const { query } = require('express')
const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const { pool } = require('./connection')
const authenticate = require('./Middlewares/auth')
const { createToken } = require('./utils')
const check = require('./Middlewares/validation')


const schemas = require('./schema')












// router.post('/register',async (req, res, next) => {
//     const { id,
//         email,
//         password,
//         firstname,
//         lastname,
//         mobilenumber } = req.body

//     try {
//         if (id && email && password && firstname && lastname && mobilenumber) {
//             const sql = `INSERT INTO users(id,email,password,firstname,lastname,mobilenumber) 
//                      VALUES($1,$2,$3,$4,$5,$6) returning *`
//             const result = await pool.query(sql, [id, email, password, firstname, lastname, mobilenumber])
//             res.status(200).json({ message: 'User has been Registered.', data: result.rows })

//         }
//         else {
//             res.status(400).send("Fields cannot be null.")
//         }
//     }
//     catch (error) {
//         next(err)
//         // res.status(500).send(error.message)
//     }


// })




//Routes with JOI Validation
router.post('/register',check(schemas,'regSchema'),async(req, res, next) => {
    const { id,
        email,
        password,
        firstname,
        lastname,
        mobilenumber } = req.body

    try {
        const sql = `INSERT INTO users(id,email,password,firstname,lastname,mobilenumber) 
                     VALUES($1,$2,$3,$4,$5,$6) returning *`
        const result = await pool.query(sql, [id, email, password, firstname, lastname, mobilenumber])
        res.status(200).json({ message: 'User has been Registered.', data: result.rows })
    }
    catch (err) {
        next(err)
        // res.status(500).send(error.message)
    }


})






// router.post('/login',async (req, res, next) => {
//     const { email, password } = req.body
//     // console.log(email,password)
//     try {
//         if (email && password) {
//             const sql = `SELECT * FROM users WHERE email=$1 AND password=$2`
//             const result = await pool.query(sql, [email, password])
//             // console.log(result.rows[0].id)
//             const token = await createToken(result.rows[0].id)
//             res.status(200).json({
//                 message: 'User Logged In Succesfully.',
//                 token
//             })

//         }
//         else {
//             res.status(400).send(`email and password is required`)
//         }
//     }
//     catch (error) {
//         next(err)
//         // res.status(400).send(`Please provide the right credentials for login.`)
//     } 

// })








router.post('/login',check(schemas,'logSchema'),async (req, res, next) => {
    const { email, password } = req.body
    // console.log(email,password)
    try {
       
        const sql = `SELECT * FROM users WHERE email=$1 AND password=$2`
        const result = await pool.query(sql, [email, password])
        // console.log(result.rows[0].id)
        const token = await createToken(result.rows[0].id)
        res.status(200).json({
            message: 'User Logged In Succesfully.',
            token
        })
    }
    catch (err) {
        next(err)
        // res.status(400).send(`Please provide the right credentials for login.`)
    }

})


//Getting all the task with active,completed or with both the status
router.get('/tasks', authenticate, async (req, res, next) => {
    // console.log('hsjkafh')
    const userId = Number(req.userId)
    // console.log(userId)
    let complete = req.query.complete
    if (!complete) {
        complete = null
    }
    // console.log(complete)
    const sql = `SELECT * FROM tasks WHERE ($1::boolean IS NULL OR complete=$1) AND deleted=false AND user_id=$2`
    try {
        const result = await pool.query(sql, [complete, userId])
        res.status(200).json({ data: result.rows })
    }
    catch (err) {
        next(err)
        // res.status(404).send(error.message)
    }
})


//Creating a new task into the list
router.post('/create-task', authenticate, async (req, res, next) => {
    const userId = Number(req.userId)
    const sql = `INSERT INTO tasks(id,label,complete,user_id) VALUES($1,$2,$3,$4) returning *`
    try {
        const { id, label, complete } = req.body
        const result = await pool.query(sql, [id, label, complete, userId])
        res.status(200).json({ message: 'Item Created Successfully.', data: result.rows })
    }
    catch (err) {
        next(err)
        // res.status(404).json(error.message)
    }
})






//Updating a task in the list
router.put('/change-task/:id', authenticate, async (req, res, next) => {
    const { id } = req.params
    const { label, complete } = req.body
    const sql = `Update tasks SET label=$2,complete=$3 WHERE id=$1`
    try {
        const result = await pool.query(sql, [id, label, complete])
        res.status(200).json({ message: "Item updated Successfully", data: result.rows })
    }
    catch (err) {
        next(err)
        // res.status(400).json('Please provide the right ID.')
    }
})



//Deleting a task from the list
router.delete('/delete-task/:id', authenticate, async (req, res, next) => {
    const { id } = req.params
    // const userId = Number(req.userId)
    const sql = `UPDATE tasks SET deleted=true WHERE id=$1`
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json({ message: 'Item Deleted Successfully.', data: result.rows })
    }
    catch (err) {
        next(err)
        // res.status(404).send(error.message)
    }
})

router.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
})




module.exports = router