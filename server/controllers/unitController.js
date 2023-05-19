const Unit = require('../models/unitModel');
const expressAsyncHandler = require('express-async-handler');




const addUnit = expressAsyncHandler(async (req, res) => {
    const { unitCode, unitName, postponed, parentCourse, trainer } = req.body;
    if(!unitCode || !unitName || !parentCourse || !trainer) {
        res.status(400);
        throw new Error('Unable to add unit. Please provide all required fields.');
    }
    const unit = new Unit({ unitCode, unitName, postponed, parentCourse, trainer });
    const createdUnit = await unit.save();
    if(createdUnit) {
        res.status(201).json({ message: 'Unit added successfully.', unit: createdUnit });
    }
});








module.exports = { addUnit };
