const mongooose = require('mongoose');

const timetableSchema = new mongooose.Schema({
    headline: { type: String, required: true },
    semester: { type: String, required: true },
    department: { type: String, required: true },
    course: { type: String, required: true },
    unitCode: { type: String, required: true, unique: true },
    unitName: { type: String, required: true },
    trainer: { type: String, required: true },
    time: { type: String, required: true },
    day: { type: String, required: true },
    venue: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, required: true },
    headOfDepartment: { type: String, required: true },

}, { timestamps: true });

const timeTableModel = mongooose.model('timetable', timetableSchema);

const getTimetable = () => timeTableModel.find({});
const getTimetableById = (id) => timeTableModel.findById(id);
const getTimeTableByCode = (unitCode) => timeTableModel.findOne({ unitCode });
const getTablesByDepartment = (department) => timeTableModel.find({ department });
const getTablesByCourse = (course) => timeTableModel.find({ course });
const createTimetable = (values) => new timeTableModel(values).save().then((timetable) => timetable.toObject());
const deleteTimetableById = (id) => timeTableModel.findOneAndDelete({ _id: id });
const updateTimetableById = (id, values) => timeTableModel.findByIdAndUpdate(id, values).then((timetable) => timetable.toObject());

module.exports = {
    getTimetable,
    getTimeTableByCode,
    getTimetableById,
    getTablesByDepartment,
    getTablesByCourse,
    createTimetable,
    deleteTimetableById,
    updateTimetableById,
    timeTableModel
}
