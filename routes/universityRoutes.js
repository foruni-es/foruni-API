const express = require('express');
const router = express.Router();

// --------------------------------------------------- MIDDLEWARES ---------------------------------------------------
const getUniversityMiddle = require('../middlewares/universityMiddles/getUniversityMiddle');
const getUniversityBySearchMiddle = require('../middlewares/universityMiddles/getUniversityBySearchMiddle');

// --------------------------------------------------- CONTROLADORES ---------------------------------------------------
const getUniversity = require('../controllers/universityControllers/getUniversity');
const getUniversityByQuery = require('../controllers/universityControllers/getUniversityByQuery');

// --------------------------------------------------- RUTAS ---------------------------------------------------
router.get('/', getUniversityBySearchMiddle, getUniversityByQuery);
router.get('/:name', getUniversityMiddle, getUniversity);

module.exports = router;