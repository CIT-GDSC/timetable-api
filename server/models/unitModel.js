const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const unitModel = new Schema({
    unitCode: { type: Number, required: true },
    unitName: { type: String, required: true },
    trainer: { type: String, required: true },
});
