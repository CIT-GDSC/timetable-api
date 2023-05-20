const Unit = require('../models/unitModel');
const expressAsyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');



const addUnit = expressAsyncHandler(async (req, res) => {
    const { unitCode, unitName, postponed, parentCourse, trainer, unitDescription } = req.body;
    if (!unitCode || !unitName || !parentCourse || !trainer) {
        res.status(400);
        throw new Error('Unable to add unit. Please provide all required fields.');
    }
    const validateUnit = await Unit.findOne({ unitCode });
    if (validateUnit) {
        res.status(400);
        throw new Error('Code already in use, Please change the unit code.');
    }
    const unit = new Unit({ unitCode, unitName, postponed, parentCourse, trainer, unitDescription });
    const createdUnit = await unit.save();
    if (createdUnit) {
        res.status(201).json({ message: 'Unit added successfully.', unit: createdUnit });
    }
});

const getUnits = expressAsyncHandler(async (req, res) => {
    const units = await Unit.find({});
    if (units) {
        res.status(200).json(units);
    } else {
        res.status(404);
        throw new Error('No units found.');
    }
});







module.exports = { addUnit, getUnits};
