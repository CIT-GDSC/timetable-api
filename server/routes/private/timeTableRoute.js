const express = require('express');
const router = express.Router();

const {createTimeTableEntry, getAllTimeTableEntries, updateTimeTableEntry} = require('../../controllers/timeTable');


router.post('/create', createTimeTableEntry);;
router.get('/all', getAllTimeTableEntries);
router.put('/update', updateTimeTableEntry);
