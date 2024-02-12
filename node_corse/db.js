const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'ternaprova',
    password: 'ciao',
    database: 'ternaprova',
};

async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

module.exports = { getConnection };
