const {addCourse, updateCourse, getCourses, getCourseByCode} = require('../../controllers/courseController');
const express = require('express');
const router = express.Router();

router.get('/get', getCourses);

router.get('/getcourse', getCourseByCode);

router.post('/add', addCourse);


router.put('/update/:id', updateCourse)



module.exports = router;
