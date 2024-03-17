const { PRODUCTION } = require('../constants');

const pgp = require('pg-promise')();

const connectionParameters = process.env.NODE_ENV === PRODUCTION ? 
    {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    :
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    } 

const db = pgp(connectionParameters);

module.exports = db;