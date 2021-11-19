const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME ?? 'localhost',
    port: process.env.DB_PORT ?? '3306',
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWD ?? '',
    connectionLimit: 10
});

pool.query(`CREATE TABLE IF NOT EXISTS users
            (
                id        INT AUTO_INCREMENT,
                firstName VARCHAR(255) NOT NULL,
                lastName  VARCHAR(255) NOT NULL,
                email     VARCHAR(320) NOT NULL,
                password  VARCHAR(255) NOT NULL,
                PRIMARY KEY (id)
            )`, (err, results) => {
        if (err) console.log(err);
    }
);

exports.pool = pool;