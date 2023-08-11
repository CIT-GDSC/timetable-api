const expressAsyncHandler = require('express-async-handler');
const { getAdminBySessionToken, getAdmins, getAdminsById, createAdmin, getAdminByEmail } = require('../models/Admin');
const { generateRandomString, authentication } = require('../utils');


const newAdmin = expressAsyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        return res.status(400).json("blank inputs recieved");
    }
    try {
        const isDuplicate = await getAdminByEmail(email);
        if (isDuplicate) {
            res.status(400);
            throw new Error('duplicate email found')
        }
        const salt = generateRandomString();
        const admin = await createAdmin({
            userName, email,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


const login = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.sendStatus(400);
        }
        const admin = await getAdminByEmail(email).select('+authentication.salt +authentication.password')
        if (!admin) {
            res.sendStatus(401);
        }
        const expectedHash = authentication(admin.authentication.salt, password);
        if (studentModel.authentication.password !== expectedHash) {
            res.sendStatus(401);
        }
        const salt = generateRandomString();
        admin.authentication.sessionToken = authentication(salt, admin._id.toString());
        await admin.save();
        res.cookie('timetable_api', admin.authentication.sessionToken, { domain: 'localhost', path: '/' });
        res.sendStatus(200).json(admin);

    } catch (error) {
        res.sendStatus(500);
    }
});


module.exports = { login, register };
