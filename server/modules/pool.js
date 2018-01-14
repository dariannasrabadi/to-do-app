const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'todo_app',
    host: 'localhost',
    port: 5432,
    max: 10, // max connections at a time
    idleTimeoutMillis: 5000 // miliseconds
};

const pool = new Pool(config);

module.exports = pool;
