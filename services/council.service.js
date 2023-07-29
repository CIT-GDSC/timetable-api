const mongoose = require('mongoose');

const councilSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    admissionNo: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
});


const Council = mongoose.model('Council', councilSchema);
module.exports = Council;
