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