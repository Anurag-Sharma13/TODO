const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const {client,pool} = require('./connection')

router.use()





//Getting all the task
router.get('/all_task', (req, res) => {
    const allQuery = `SELECT * FROM tasks`
    client.query(allQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;

})


//Getting all the ative task from the list
router.get('/active', (req, res) => {
    const oneQuery = `SELECT * FROM tasks WHERE complete = false`
    client.query(oneQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
})


//Getting all the completed tasks from the list
router.get('/completed', (req, res) => {
    const oneQuery = `SELECT * FROM tasks WHERE complete = true`
    client.query(oneQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
})


//Creating the task in the list
router.post('/create',(req, res) => {
    const task = req.body
    const createQuery = `INSERT INTO tasks(id,label,complete) VALUES(${task.id},'${task.label}','${task.complete}')`
    client.query(createQuery, (err, result) => {
        if (!err) {
            res.send('Insertion completed')
        }
        else{
            console.log(err.message)
        }
    })
    // const sql = `INSERT INTO users(id,label,complete) VALUES($1,$2,$3) returning id`
    // try {
    //     const res = await pool.query(sql,[task.id,task.label,task.complete])
        
    // } catch (error) {
        
    // }
    

    client.end;
})


//Deleting the task from the list
router.delete('/delete/:ID',(req,res)=>{
    const deleteQuery = `DELETE FROM tasks WHERE ID = ${req.params.ID}`
    client.query(deleteQuery,(err,result)=>{
        if(!err){
            res.send('Item Deleted')
        }
        else{
            console.log(err.message)
        }
    })
    client.end;

})



client.connect()
module.exports = router
