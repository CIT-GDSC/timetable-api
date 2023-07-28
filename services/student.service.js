const mongoose = require('mongoose');

//**@desc  */


const studentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    isCouncil: {
        type: Boolean,
        default: false,
    },
    department: {
        type: String,
        required: true,
    },
    isverified: {
        type: String,
        default: "unverified",
    },
    admissionNo: {
        type: String,
        required: true,
        unique: true,
    },
});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
