const express = require('express');
const router = express.Router();
const { addCourse, updateCourse, getCourseById, getCourses } = require('../controllers/courseController');


//private/protected routes
router.post('/add', addCourse);


router.put('/update', updateCourse);


//public routes
router.get('/get', getCourses);

router.get('/get/:courseCode', getCourseById);






// export default router;
module.exports = router;
