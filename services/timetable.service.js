const mongooose = require('mongoose');




const timetableSchema = new mongooose.Schema({
    headline: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    unitCode: {
        type: String,
        required: true
    },
    unitName: {
        type: String,
        required: true
    },
    trainer : {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    headOfDepartment: {
        type: String,
        required: true
    },
    
});