const express = require('express');
const { addUnit, getUnits, updateUnit, getUnitByCode} = require('../controllers/unitController');
const router = express.Router();

//private
router.post('/add', addUnit );

router.put('/update', updateUnit);


//public
router.get('/get', getUnits);


router.get('/getbycode', getUnitByCode);


module.exports = router;
