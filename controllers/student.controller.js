//save student
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//TODO: add the last and first name entry

const Student = require('../services/student.service');
const generateToken = require('../utilities/generateToken');

const createStudent = expressAsyncHandler(async (req, res) => {
    const { userName, email, course, department, admissionNo, password } = req.body;

    if (!userName || !email || !course || !department || !admissionNo || !password) {
        res.status(400);
        throw new Error("bad request, fields cannot be empty")
    }
    const isDuplicate = await Student.findOne({ userName });
    if (isDuplicate) {
        res.status(400);
        throw new Error("cannot be duplicate")
    }
    try {
        if (!userName || !email || !course || !department || !admissionNo) {
            res.status(400);
            throw new Error('fields cannot be blank')
        }
        const salt = bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt);
        const student = await Student.create({
            userName,
            email,
            course,
            department,
            admissionNo,
            password: hashedPassword
        });
        await student.save();
        if (student) {
            res.status(200);
            res.json({
                userName: student.userName,
                email: student.email,
                course: student.course,
                department: student.department,
                admissionNo: student.admissionNo,
                isCouncil: student.isCouncil,
                isVerified: student.isverified,
                AccessToken: generateToken(student._id)
            });

        } else {
            res.status(403);
            throw new Error("Something went wrong");
        }
    } catch (err) {
        res.status(500);
        throw new Error(err)
    }
});

const loginStudent = expressAsyncHandler(async (req, res) => {
    const { admissionNo, password } = req.body;
    const student = await Student.findOne({ admissionNo });

    if (student && (bcrypt.compare(password, student.password))) {
        res.status(200).json({
            _id: student.id,
            Name: student.userName,
            email: student.email,
            course: student.course,
            department: student.department,
            admissionNo: student.admissionNo,
            isCouncil: student.isCouncil,
            isVerified: student.isverified,
        });
    } else {
        res.status(403);
        throw new Error("invalid credentials or user not found");
    }

});

const getStudents = expressAsyncHandler(async (req, res) => {
    const students = await Student.find({});
    if (students) {
        res.sendStatus(200).json({ students });
    } else {
        res.sendStatus(404).json("No students found");
    }
});

const getMyProfile = expressAsyncHandler(async (req, res) => {
    const student = await Student.findById({ _id: req.params.id });
    student ? res.status(200).json({ student }) : res.status(404).json("No details found");
})
module.exports = { createStudent, getMyProfile, loginStudent, getStudents }