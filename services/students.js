const express = require('express');
const { getStudentById, deleteStudentById, getStudents, studentModel } = require('../models/studentsSchema');
const expressAsyncHandler = require('express-async-handler');

const getAllStudents = expressAsyncHandler(async (req, res) => {
    try {
        const students = await getStudents();
        return res.sendStatus(200).json(students);
    } catch (error) {
        res.status(500).json("fatal, please try again later")
    }
});


const deleteStudent = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await deleteStudentById(id);
        return res.status(200).json(deletedStudent);
    } catch (error) {
        throw new Error(error);
        return res.sendStatus(500).json("try again later")
    }
})

// todo: to be implemented in later days: updateRouter