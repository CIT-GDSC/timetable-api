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

export const studentModel = mongoose.model('student', studentSchema);

export const getStudents = () => studentModel.find({});
export const getStudentById = (id) => studentModel.findById(id);
export const getStudentByEmail = (email) => studentModel.findOne(email);
const getUserBySessionToken = (sessionToken) => studentModel({
    'authentication.sessionToken': sessionToken
});
export const createStudent = (values) => new studentModel(values).save()
    .then((student) => student.toObject());

export const deleteUserById = (id) => studentModel.findOneAndDelete({ _id: id });
export const updateUserById = (id, values) => studentModel.findByIdAndUpdate(id, values);