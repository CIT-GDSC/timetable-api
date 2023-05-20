const Unit = require('../models/unitModel');
const expressAsyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');



const addUnit = expressAsyncHandler(async (req, res) => {
    const { unitCode, unitName, postponed, parentCourse, unitDescription } = req.body;
    if (!unitCode || !unitName || !parentCourse || !unitDescription) {
        res.status(400);
        throw new Error('Unable to add unit. Please provide all required fields.');
    }
    const validateUnit = await Unit.findOne({ unitCode });
    if (validateUnit) {
        res.status(400);
        throw new Error('Code already in use, Please change the unit code.');
    }
    const unit = new Unit({ unitCode, unitName, postponed, parentCourse, unitDescription });
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


//update
const updateUnit = expressAsyncHandler(async (req, res) => {
    const unit = await Unit.findById(req.params.id);
    if (unit) {
        unit.unitCode = req.body.unitCode || unit.unitCode;
        unit.unitName = req.body.unitName || unit.unitName;
        unit.parentCourse = req.body.parentCourse || unit.parentCourse;
        unit.unitDescription = req.body.unitDescription || unit.unitDescription;
    }
    const updatedUnit = await unit.save();
    if (updatedUnit) {
        res.status(200).json({ message: 'Unit updated successfully.', unit: updatedUnit });
    } else {
        res.status(500);
        throw new Error('Unable to update unit.');
    }
});


//get unit by code
const getUnitByCode = expressAsyncHandler(async (req, res) => {
    const { unitCode } = req.body;
    if (!unitCode) {
        res.status(400);
        throw new Error('Please provide unit code.');
    }
    const unit = await Unit.findOne({ unitCode });
    if (unit) {
        res.status(200).json(unit);
    } else {
        res.status(404);
        throw new Error('No unit found.');
    }
});



module.exports = { addUnit, getUnits, updateUnit, getUnitByCode};
