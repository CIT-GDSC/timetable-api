const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const unitModel = new Schema({
    unitCode: { type: Number, required: true },
    unitName: { type: String, required: true },
    parentCourse: { type: String, required: true },
    unitDescription: { type: String, required: true },
    trainer: { type: String, required: true },
});




const Unit = mongoose.model('Unit', unitModel);
module.exports = Unit;
