const express = require('express');
const router = express.Router();
const {  getCourseByCode, getCourses } = require('../../controllers/courseController');



//public routes
router.get('/get', getCourses);

router.get('/getcourse', getCourseByCode);






// export default router;
module.exports = router;
