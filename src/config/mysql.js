const mysql = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config()
console.log('password::', process.env.MYSQL_PASSWORD)
const connection = mysql.createPool({
    host: 'localhost',
    user:'admin', 
    password: 'tkxel1234',
    database: 'ecom',
    port: 3306
})


module.exports = connection