const express = require('express');
const router = express.Router();

const {register, login } = require('../controllers/student');



module.exports = (router)=>{
    router.post('/auth/register',register);
    router.post('/auth/login', login);
};
