const express = require('express');
const router = express.Router();


router.post('/addUnit', (req, res) => {
    res.status(200).json('Unit added successfully');
});


//public
router.get('/getUnits', (req, res) => {
    res.status(200).json('Units retrieved successfully');
});

module.exports = router;
