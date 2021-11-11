const mysql = require('mysql');
require('dotenv').config();

exports.pool = mysql.createPool({
    host: process.env.DB_HOSTNAME ?? 'localhost',
    port: process.env.DB_PORT ?? '3306',
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWD ?? '',
    connectionLimit: 10
});