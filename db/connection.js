const mysql = require('mysql2');
require("dotenv").config();

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_DATABSASE
  });

// var con = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'dbms',
//     database:'dbms_proj'
//   });

connect();
//used to establish connection with the database
function connect()
{
    con.connect(function(err) 
    {
        if (err) throw err;
        console.log("database Connected!");

    });
}

 async function execute(query, params) {
    try {
        console.log(query);
        const result = await con.promise().query(query,params)
        return result[0];
    } catch (error) {
        console.error('error: ', error);
        console.debug('failed to execute query', query, params);
        throw new Error('failed to execute query');
    }
}

module.exports = execute;
