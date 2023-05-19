const express = require('express');
const router = express.Router();

//private
router.post('/addUnit', (req, res) => {
    res.status(200).json('Unit added successfully');
});

router.put('/updateUnit', (req, res) => {
    res.status(200).json('Unit updated successfully');
});


//public
router.get('/getUnits', (req, res) => {
    res.status(200).json('Units retrieved successfully');
});


module.exports = router;
