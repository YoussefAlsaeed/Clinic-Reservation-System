const dbConfig = require('./config/dbConfig.js');

const mysql = require('mysql2/promise');
    
const { HOST, PORT, USER, PASSWORD, DB } = dbConfig;

const connection = mysql.createConnection({       
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD, 
}).then((connection)=>{
    connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`).then(() => {
        
    })

    connection.end();
})