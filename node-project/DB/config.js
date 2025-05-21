const mysql = require('mysql2');
const HOST =process.env.HOST||'localhost'
const USER =process.env.USER||'root'
const PASSWORD=process.env.PASSWORD||'root'
const DATABASE= process.env.DATABASE||'Tasks_db'
const DB_PORT=process.env.DB_PORT||3306

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = db;
