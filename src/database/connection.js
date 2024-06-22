// const { Pool } = require('pg');
// const dotenv = require('dotenv');
//
// dotenv.config();
//
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });
//
// module.exports = pool;
//

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('Connected to the database'); // Log successful connection
});

pool.on('error', (err) => {
    console.error('Database connection error:', err.stack); // Log connection errors
});

module.exports = pool;
