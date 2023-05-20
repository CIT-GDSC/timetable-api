//timetable schema
const mongoose = require('mongoose');
const { Schema } = mongoose;


const timeTableSchema = new Schema({
    courseCode: {
        type: String,
        required: true,
    },
    unitCode: {
        type: String,
        required: true,
    },
    Module: {
        type: String,
        required: true,
    },
    trainerCode: {
        type: String,
        required: true,
    },
    trainerName: {
        type: String,
        required: true,
    },
    DayOfTheWeek: {
        type: Date,
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
    Venue: {
        type: String,
        required: true,
    },
    Duration: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
        enum: ['Scheduled', 'Cancelled', 'Completed'],
    },

}, { timestamps: true });


const TimeTable = mongoose.model('TimeTable', timeTableSchema);
module.exports = TimeTable;
