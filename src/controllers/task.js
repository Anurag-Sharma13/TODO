const { query } = require('express')
const { pool } = require('../database/config/connection')


const tasks = async(req,res,next)=>{
    const userId = Number(req.userId)
    let complete = req.query.complete
    if (!complete) {
        complete = null
    }
    const sql = `SELECT * FROM tasks WHERE ($1::boolean IS NULL OR complete=$1) AND deleted=false AND user_id=$2`
    try {
        const result = await pool.query(sql, [complete, userId])
        res.status(200).json({ data: result.rows })
    }
    catch (err) {
        next(err)
        // res.status(404).send(error.message)
    }
}


const createTask = async(req,res,next)=>{
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
}



const changeTask = async(req,res,next)=>{
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
}


const deleteTask = async(req,res,next)=>{
    const { id } = req.params
    const sql = `UPDATE tasks SET deleted=true WHERE id=$1`
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json({ message: 'Item Deleted Successfully.', data: result.rows })
    }
    catch (err) {
        next(err)
        // res.status(404).send(error.message)
    }
}

module.exports = {tasks,createTask,changeTask,deleteTask}
