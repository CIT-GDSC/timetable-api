const timeTableModel = require('../models/timetableSchema');
const expressAsyncHandler = require('express-async-handler');
const { getAdminBySessionToken } = require('../models/adminSchema');

const { getTimetable, getTimeTableByCode, getTimetableById, getTablesByDepartment, getTablesByCourse, createTimetable, deleteTimetableById, updateTimetableById } = timeTableModel;


const createTable = expressAsyncHandler(async (req, res) => {
    const { headline, semester, department, course, unitCode, unitName, trainer, time, day, venue, duration, date, headOfDepartment } = req.body;

    try {
        const admin = await getAdminBySessionToken(req.headers.authorization);
        if (!admin) {
            res.status(401).send({ message: 'You are not authorized to create a timetable' });
        }
        const timetable = await createTimetable({ headline, semester, department, course, unitCode, unitName, trainer, time, day, venue, duration, date, headOfDepartment });

        if (timetable) {
            res.status(201).json(timetable);
        } else {
            res.status(400).send({ message: 'Invalid timetable data' });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const getTables = expressAsyncHandler(async (req, res) => {
    try {
        const tables = await getTimetable();
        if (tables) {
            res.status(200).json(tables);
        } else {
            res.status(404).send({ message: 'No timetable found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const getTableByCode = expressAsyncHandler(async (req, res) => {
    try {
        const table = await getTimeTableByCode(req.params.unitCode);
        if (table) {
            res.status(200).json(table);
        } else {
            res.status(404).send({ message: 'No timetable found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const getTableById = expressAsyncHandler(async (req, res) => {
    try {
        const table = await getTimetableById(req.params.id);
        if (table) {
            res.status(200).json(table);
        } else {
            res.status(404).send({ message: 'No timetable found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const getTablesByDept = expressAsyncHandler(async (req, res) => {
    try {
        const tables = await getTablesByDepartment(req.params.department);
        if (tables) {
            res.status(200).json(tables);
        } else {
            res.status(404).send({ message: 'No timetable found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


const findTablesyCourse = expressAsyncHandler(async (req, res) => {
    try {
        const tables = await getTablesByCourse(req.params.course);
        if (tables) {
            res.status(200).json(tables);
        } else {
            res.status(404).send({ message: 'No timetable found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const deleteTableById = expressAsyncHandler(async (req, res) => {
    try {
        const admin = await getAdminBySessionToken(req.headers.authorization);
        if (!admin) {
            res.status(401).send({ message: 'You are not authorized to delete a timetable' });
        }
        const table = await deleteTimetableById(req.params.id);
        if (table) {
            res.status(200).json(table);
        } else {
            res.status(404).send({ message: 'No timetable found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const updateTableById = expressAsyncHandler(async (req, res) => {
    try {
        const admin = await getAdminBySessionToken(req.headers.authorization);
        if (!admin) {
            res.status(401).send({ message: 'You are not authorized to update a timetable' });
        }
        const table = await updateTimetableById(req.params.id, req.body);
        if (table) {
            res.status(200).json(table);
        } else {
            res.status(404).send({ message: 'No timetable found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = { createTable, getTables, getTableByCode, getTableById, getTablesByDept, findTablesyCourse, deleteTableById, updateTableById };
