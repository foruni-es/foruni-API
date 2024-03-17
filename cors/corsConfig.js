const cors = require('cors');
const { DEVELOPMENT, PRODUCTION, DEVELOPMENT_DOMAIN } = require('../constants');

const whitelist = ['https://foruni.es', 'https://www.foruni.es'];

const corsConfig = cors({
    credentials: true,
    origin: 
        process.env.NODE_ENV === DEVELOPMENT ? 
        'http://localhost:3000'
        : process.env.NODE_ENV === PRODUCTION &&
        function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) callback(null, true);
            else callback(new Error('Not allowed by CORS'));
        }
});

module.exports = corsConfig;