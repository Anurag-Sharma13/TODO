const {Client} = require('pg')
const { Pool } = require('pg/lib')

const client = new Client({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'cancer',
    database:'todo',
})

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'cancer',
    database:'todo',
})

module.exports = {client,pool}