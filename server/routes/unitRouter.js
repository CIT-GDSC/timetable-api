const express = require('express');
const router = express.Router();

//private
router.post('/add', (req, res) => {
    res.status(200).json('Unit added successfully');
});

router.put('/update', (req, res) => {
    res.status(200).json('Unit updated successfully');
});


//public
router.get('/get', (req, res) => {
    res.status(200).json('Units retrieved successfully');
});


module.exports = router;
