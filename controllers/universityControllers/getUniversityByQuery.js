const db = require('../../database/db');
const { validationResult } = require('express-validator');

const { ERROR_404, PRODUCTION, ERROR_500 } = require('../../constants');
const { GET_UNI_BY_SEARCH } = require('../../database/queries/universityQueries');

const getUniversityByQuery = async (req, res) => {

    try {

        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(404).json({ message: ERROR_404 });
        
        const universities = await db.manyOrNone(GET_UNI_BY_SEARCH, ['%' + req.query.search + '%', '%' + req.query.search + '%']);

        res.json({ universities });

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = getUniversityByQuery;