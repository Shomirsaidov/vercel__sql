const sql = require('mysql2')
require('dotenv').config()

const connection = sql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD
})

connection.connect((e) => {
	if(e) console.warn(e)
	else console.log('Connected to the database !')
})


module.exports.connection = connection