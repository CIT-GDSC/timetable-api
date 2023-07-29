const Student = require('../services/student.service');
const Council = require('../services/council.service');

const expressAsyncHandler = require('express-async-handler');

/**
 * 
 */

const registerCouncil = expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, userName, email, admissionNo, position, department } = req.body;
    if (!firstName || !lastName || !userName || !email || !admissionNo || !position || !department) {
        res.status(400).send({ message: 'All fields are required' });
    }
    const validateStudent = await Student.findOne({ admissionNo });
    const isCouncil = await Council.findOne({ admissionNo });

    if (!validateStudent) {
        res.status(400).send({ message: 'Student does not exist' });
    };
    if (isCouncil) {
        res.status(400).send({ message: 'Council already exists' });
    }
    const council = new Council({
        firstName,
        lastName,
        userName,
        email,
        admissionNo,
        position,
        department
    });
    const createdCouncil = await council.save();
    if (createdCouncil) {
        res.status(201).send({
            _id: createdCouncil._id,
            firstName: createdCouncil.firstName,
            lastName: createdCouncil.lastName,
            userName: createdCouncil.userName,
            email: createdCouncil.email,
            admissionNo: createdCouncil.admissionNo,
            position: createdCouncil.position,
            department: createdCouncil.department,
        });
    };
});


const getInfoByID = expressAsyncHandler(async (req, res) => {
    const council = await Council.findById(req.params.id);
    if (council) {
        res.send(council);
    } else {
        res.status(404).send({ message: 'Council not found' });
    }
});