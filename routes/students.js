const express = require('express');




const router = express.Router();



const { createStudent, getMyProfile, getStudents } = require('../controllers/student.controller');

router.post('/', createStudent);
router.get('/me',getMyProfile);
router.get('/students', getStudents);




module.exports = router;