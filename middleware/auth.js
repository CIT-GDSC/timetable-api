const express = require('express');
const { get, merge } = require('lodash');


const { getStudentBySessionToken } = require('../models/studentsSchema');
const expressAsyncHandler = require('express-async-handler');

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
    try {
        const sessionToken = req.cookies['timetable_api'];
        if (!sessionToken) {
            res.status(401);
            return res.json("unauthorized due to token issues, please login again")
        }
        const checkExistingUser = await getStudentBySessionToken(sessionToken);
        if (!checkExistingUser) {
            return res.sendStatus(401).json("Authorization issues, please login again");
        }
        merge(req, { identity: checkExistingUser });
        return next();
    } catch (error) {
        return res.status(500).json('fatal, internal server error')
    }
});

const isValidUser = expressAsyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentstudent = get(req, `identity_id`);
        if (!currentstudent) {
            return res.sendStatus(401);
        }
        if (currentstudent.toString() !== id) {
            return res.sendStatus(403)
        }
        next();
    } catch (error) {
        throw new Error(error);
        res.status(400);
    }
});