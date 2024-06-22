const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    database: {
        user: process.env.DB_USER || 'mac',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'seruya',
        password: process.env.DB_PASSWORD || 'yourpassword',
        port: process.env.DB_PORT || 5432,
    },
};
