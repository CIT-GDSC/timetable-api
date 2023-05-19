const express = require('express');
const { addUnit } = require('../controllers/unitController');
const router = express.Router();

//private
router.post('/add', addUnit );

router.put('/update', (req, res) => {
    res.status(200).json('Unit updated successfully');
});


//public
router.get('/get', (req, res) => {
    res.status(200).json('Units retrieved successfully');
});


module.exports = router;
