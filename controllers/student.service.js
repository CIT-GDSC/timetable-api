//save student

const Student = require('../models/student.service');
const expressAsyncHandler = require('express-async-handler');


const createStudent = expressAsyncHandler( async( req, res)=>{
    const {userName, email, course, isCouncil, department } = req.body;
    try{
        if(!userName || !email || !course || !department){
            res.status(400);
            throw new Error('fields cannot be blank')
        }
        const student = await Student.create({
            userName,
            email,
            course,
            isCouncil,
            department
        });
        if(student){
            res.status(200);
            res.json({
                userName: userName,
                email: email,
                course: course,
                isCouncil: isCouncil,
                department: department,
            });

        } else{
            res.status(403);
            throw new Error("Something went wrong");
        }
    } catch (err){
        res.status(500);
        throw new Error(err)
    }
});


const getMyProfile = expressAsyncHandler( async (req, res)=>{
    const student = await Student.findById({ _id: req.params.id});
    student ? res.status(200).json({ student}) : res.status(404).json("No details found");
})
module.exports = { createStudent, getMyProfile}