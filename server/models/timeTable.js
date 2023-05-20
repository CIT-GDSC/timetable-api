//timetable schema
const mongoose = require('mongoose');
const { Schema } = mongoose;


const timeTableSchema = new Schema({
    timeTableName: {
        type: String,
        required: true,
        unique: true,
    },
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
        type: String,
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
        enum: ['Scheduled', 'Postponed', 'Completed'],
    },

}, { timestamps: true });


const TimeTable = mongoose.model('TimeTable', timeTableSchema);
module.exports = TimeTable;
