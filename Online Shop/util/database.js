const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_course',
    password: 'jeet@mysql98',
});

module.exports = pool.promise();