const express = require('express');
const router = express.Router();


const {getAllTimeTableEntries, } = require('../../controllers/timeTable');



router.get('/all', getAllTimeTableEntries);
