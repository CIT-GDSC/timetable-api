const mongoose = require('mongoose');





const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    teacherId: { type: String, required: true, },
    department: { type: String, required: true, },
    email: { type: String, required: true, },
});


const Teacher = mongoose.model('Teacher', teacherSchema);


const getTeachers = () => teacherSchema.find({});
const getTeacherById = (id) => teacherSchema.findById(id);
const deleteTeacher = (id) => teacherSchema.findByIdAndDelete(id);
const updateTeacher = (id, values) => teacherSchema.findByIdAndUpdate(id, values);
const createTeacher = (values) => new Teacher(values).save()
    .then((teacher) => teacher.toObject());

module.exports = {
    getTeachers,
    getTeacherById,
    deleteTeacher,
    updateTeacher,
    createTeacher,
    Teacher
}