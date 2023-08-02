const expressAsyncHandler = require('express-async-handler');

const { authentication, generateRandomString } = require('../models/studentsSchema');
const { createStudent, getStudentByEmail } = require('../models/studentsSchema');

const register = expressAsyncHandler(async (req, res) => {
    const { userName, firstName, lastName, email, course, department, admissionNo, password } = req.body;
    if (!userName || !firstName || !lastName || !email || !course || !department || !admissionNo || !password) {
        return res.status(400).json("Input cannot be blank");
    }

    try {
        const isDuplicate = await getStudentByEmail(email);
        if (isDuplicate) {
            return res.status(400).json("Email already registered");
        }

        const salt = generateRandomString();
        const student = await createStudent({
            userName, firstName, lastName, email, course, department, admissionNo,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server failed");
    }
});

const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("Input not received");
    }

    try {
        const student = await getStudentByEmail(email).select('+authentication.salt +authentication.password');
        if (!student) {
            return res.status(404).json("Email not found");
        }

        const expectedHash = authentication(student.authentication.salt, password);
        if (student.authentication.password !== expectedHash) {
            return res.status(403).json("Unauthorized");
        }

        const salt = generateRandomString();
        student.authentication.sessionToken = authentication(salt, student._id.toString());
        await student.save();

        res.cookie('timetable_api', student.authentication.sessionToken, { domain: 'localhost', path: '/' });
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

module.exports = { login, register };
