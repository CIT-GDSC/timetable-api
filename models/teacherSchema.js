const mongoose = require('mongoose');





const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    teacherId: { type: String, required: true, },
    department: { type: String, required: true, },
    email: { type: String, required: true, },
    role: { type: String, default: 'trainer', },
    password: { type: String, required: true, },
});


const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
