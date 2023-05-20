const express = require('express');
const { addUnit, getUnits, getUnitsByCourse } = require('../controllers/unitController');
const router = express.Router();

//private
router.post('/add', addUnit );

router.put('/update', (req, res) => {
    res.status(200).json('Unit updated successfully');
});


//public
router.get('/get', getUnits);
router.get('/unitsbycourse', getUnitsByCourse);


module.exports = router;
