const express = require('express');




const router = express.Router();



const { createStudent, getMyProfile } = require('../controllers/student.controller');

router.route('/').post(createStudent);
router.route('/:id').get(getMyProfile);



module.exports = router;