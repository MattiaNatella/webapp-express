import mysql from 'mysql2'
import 'dotenv/config'

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connesso al database MySQL!!!')
})

export default connection