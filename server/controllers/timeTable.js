const TimeTable = require('../models/timeTable');
const Course = require('../models/courseModel');
const Unit = require('../models/unitModel');
const expressAsyncHandler = require('express-async-handler');
const moment = require('moment');


// Create a new timeTable
const createTimeTableEntry = expressAsyncHandler(async (req, res) => {
    try {
        const { courseCode, unitCode, Module, trainerCode, trainerName, DayOfTheWeek, Time, Venue, Duration, Status } = req.body;
        //validate the request
        if (!courseCode || !unitCode || !Module || !trainerCode || !trainerName || !DayOfTheWeek || !Time || !Venue || !Duration || !Status) {
            res.status(400).send({ message: 'Please fill all required fields' });
        }
        const validCourse = await Course.exists({ courseCode: courseCode });
        const validUnit = await Unit.exists({ unitCode: unitCode });
        if (!validCourse || !validUnit) {
            res.status(400).send({ message: 'Invalid course or unit' });
        }

        //parse the date 
        const parsedData = moment(Time, 'HH:mm').toDate();
        const timeTableEntry = await TimeTable.create({
            courseCode,
            unitCode,
            Module,
            trainerCode,
            trainerName,
            DayOfTheWeek,
            Time: parsedData,
            Venue,
            Duration,
            Status,
        });
        res.status(201).send({ message: 'TimeTable entry created successfully', timeTableEntry });
    } catch (error) {
        res.status(500).send({ message: 'Error creating timeTable entry: API failure', error });
    }
});


const getAllTimeTableEntries = expressAsyncHandler(async (req, res) => {
    try {
        const timeTableEntries = await TimeTable.find({});
        const formattedEntries = timeTableEntries.map(entry => ({
            ...entry._doc,
            Time: moment(entry._doc.Time).format('HH:mm'),
            createdAt: moment(entry._doc.createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(entry._doc.updatedAt).format('DD/MM/YYYY'),
        }));
        res.status(200).send({ message: 'TimeTable entries fetched successfully', timeTableEntries: formattedEntries });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching timeTable entries: ', error });
    }
});


const updateTimeTableEntry = expressAsyncHandler(async (req, res) => {
    try {
        const { courseCode, unitCode, Module, trainerCode, trainerName, DayOfTheWeek, Time, Venue, Duration, Status } = req.body;
        //validate the request
        const validCourse = await Course.exists({ courseCode: courseCode });
        const validUnit = await Unit.exists({ unitCode: unitCode });
        if (!validCourse || !validUnit) {
            res.status(400).send({ message: 'Invalid course or unit' });
        }
        const updateEntry = TimeTable.findByIdAndUpdate(id, {
            courseCode,
            unitCode,
            Module,
            trainerCode,
            trainerName,
            DayOfTheWeek,
            Time,
            Venue,
            Duration,
            Status,
            updatedAt: Date.now(),
        }, { new: true });
        res.status(200).send({
            message: 'TimeTable entry updated successfully', updateEntry
        });
    } catch (error) {
        res.status(500).send({ message: 'Error updating timeTable entry: ', error });
    }
});


module.exports = {
    createTimeTableEntry,
    getAllTimeTableEntries,
};

