const { query } = require('express')
const { pool } = require('../database/config/connection')
const { createToken } = require('../utils/utils')





const register = async(req,res,next)=>{
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

}

const login = async(req,res,next)=>{
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
}

module.exports = {register,login}