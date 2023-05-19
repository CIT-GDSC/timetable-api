const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const courseSchema = new Schema({
    courseCode: { Number, required: true },
    courseName: { type: String, required: true },
    courseDepartment: { type: String, required: true },
    HeadOfDepartment: { type: String, required: true },
});


const Course = mongoose.model('Course', courseSchema);
