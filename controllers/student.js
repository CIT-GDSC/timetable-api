const expressAsyncHandler = require('express-async-handler');

const { authentication, generateRandomString } = require('../models/studentsSchema');
const { createStudent, getStudentByEmail } = require('../models/studentsSchema');



export const register = expressAsyncHandler(async (req, res) => {
    const { userName, firstName, lastName, email, course, department, admissionNo, password } = req.body;
    if (!userName || !firstName || !lastName || !email || !course || !department || !admissionNo || !password) {
        return res.sendStatus(400).json("Input cannot be blank");
    }
    try {
        const isDuplicate = await getStudentByEmail(email);
        if (isDuplicate) {
            return res.sendStatus(400).json("email already registered");
        }

        //authenticate student
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
        throw new Error(error);
        return res.sendStatus(500).json("server failed")
    }
});


export const login = expressAsyncHandler(async (req, res) => {
    const {email, password } = req.body;
    if(!email || !password){
        return res.sendStatus(400).json("input not recieved");
    }
    try {
        const student = await getStudentByEmail(email).select('+authentication.salt +authentication.password');
        if(!student){
            res.sendStatus(404).json("email not found")
            return;
        }
        const expectedHash = authentication(student.authentication.salt, password);
        if(!student.authentication.password !== expectedHash){
            res.sendStatus(403).json("unauthorized");
        }
        //update the session token
        const salt = generateRandomString();
        student.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        //set cookies
        res.cookie('timetable_api', student.authentication.sessionToken, { domains: 'localhost', path: '/'});
        res.status(200).json(user).end();
    } catch (error) {
        throw new Error(error);
        res.sendStatus(500);
    }
});