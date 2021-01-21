const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: ''
})

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log('You are now connected')
})

module.exports = connection
