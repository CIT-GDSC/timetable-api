const express = require('express');
const router = express.Router();



//private/protected routes
router.post('/add', (req, res) => {
    res.status(200).json('Course added successfully');
 })


router.put('/update', (req, res) => {
    res.status(200).json('Course updated successfully');
});


//public routes
router.get('/get', (req, res) => {
    res.status(200).json('Courses retrieved successfully');
});






// export default router;
module.exports = router;
