const express = require('express');
const {  getUnits, updateUnit, getUnitByCode} = require('../../controllers/unitController');
const router = express.Router();


//public
router.get('/get', getUnits);


router.get('/getbycode', getUnitByCode);


module.exports = router;
