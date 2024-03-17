const cors = require('cors');
const { DEVELOPMENT, PRODUCTION, DEVELOPMENT_DOMAIN, PRODUCTION_DOMAIN, PRODUCTION_DOMAIN_2 } = require('../constants');

const whitelist = [PRODUCTION_DOMAIN];

const corsConfig = cors({
    credentials: true,
    origin: 
        process.env.NODE_ENV === DEVELOPMENT ? 
        DEVELOPMENT_DOMAIN
        : process.env.NODE_ENV === PRODUCTION &&
        function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) callback(null, true);
            else callback(new Error('Not allowed by CORS'));
        }
});

module.exports = corsConfig;