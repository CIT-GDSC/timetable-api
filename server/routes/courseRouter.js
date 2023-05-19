const express = require('express');
const router = express.Router();
const { addCourse, updateCourse, getCourseByCode, getCourses } = require('../controllers/courseController');


//private/protected routes
router.post('/add', addCourse);


router.put('/update/:id', updateCourse)


//public routes
router.get('/get', getCourses);

router.get('/getcourse', getCourseByCode);






// export default router;
module.exports = router;
