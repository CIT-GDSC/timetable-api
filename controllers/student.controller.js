//save student

const Student = require('../services/student.service');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../utilities/generateToken');

const createStudent = expressAsyncHandler(async (req, res) => {
    const { userName, email, course, department, admissionNo } = req.body;

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
        const student = await Student.create({
            userName,
            email,
            course,
            department,
            admissionNo,
        });
        // console.log(generateToken(payload));
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


const getMyProfile = expressAsyncHandler(async (req, res) => {
    const student = await Student.findById({ _id: req.params.id });
    student ? res.status(200).json({ student }) : res.status(404).json("No details found");
})
module.exports = { createStudent, getMyProfile }