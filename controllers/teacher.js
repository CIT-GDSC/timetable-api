const expressAsyncHandler = require('express-async-handler');
const { Teacher, createTeacher, getTeachers, getTeacherById, deleteTeacher, updateTeacher } = require('../models/teacherSchema');


const createTeacher = expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, teacherId, department, email } = req.body;
    if(!firstName || !lastName || !teacherId || !department || !email){
        res.status(403)
        throw new Error('empty fields');
    }
    try {
        const teacher = await createTeacher({
            firstName, lastName, teacherId, department, email
        });
        if(teacher){
            res.status(200);
            res.json(teacher);
        }else{
            res.status(400);
            throw new Error('input validation failed')
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


const teacherUpdate = expressAsyncHandler(async(req,res)=>{
    try {
        const { teacherId, department, email } = req.body;
        if(!teacherId){
            res.status(400);
            throw new Error('mandatory teacher id must be provided');
        };
        const checkUser = await Teacher.findOne({teacherId});
        if(checkUser){
            checkUser.department = department,
            checkUser.email = email
        } else{
           return res.sendStatus(404);
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});