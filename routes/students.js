const express = require('express');
const { isAuthenticated, isValidUser } = require('../middleware/auth');
const router = express.Router();

const { getAllStudents, deleteStudent } = require('../services/students');


module.exports =()=>{
    router.get('/students')
    router.delete('/students/:id', isAuthenticated, isValidUser, deleteStudent)
}