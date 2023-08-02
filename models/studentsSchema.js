const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true, },
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true },
    email: { type: String, required: true, },
    course: { type: String, required: true, },
    department: { type: String, required: true, },
    // isverified: { type: String, default: "unverified", },
    admissionNo: { type: String, required: true, unique: true, },
    authentication: {
        password: { required: true, type: String, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

const studentModel = mongoose.model('student', studentSchema);

const getStudents = () => studentModel.find({});
const getStudentById = (id) => studentModel.findById(id);
const getStudentByEmail = (email) => studentModel.findOne(email);
const getStudentBySessionToken = (sessionToken) => studentModel({
    'authentication.sessionToken': sessionToken
});
const createStudent = (values) => new studentModel(values).save()
    .then((student) => student.toObject());

const deleteStudentById = (id) => studentModel.findOneAndDelete({ _id: id });
const updateStudentById = (id, values) => studentModel.findByIdAndUpdate(id, values);

module.exports = {
    getStudents,
    getStudentByEmail,
    getStudentById,
    getStudentBySessionToken,
    createStudent,
    deleteStudentById,
    updateStudentById
}