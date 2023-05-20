const express = require('express');
const { addUnit, getUnits, updateUnit,} = require('../controllers/unitController');
const router = express.Router();

//private
router.post('/add', addUnit );

router.put('/update', updateUnit);


//public
router.get('/get', getUnits);


module.exports = router;
