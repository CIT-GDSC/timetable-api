const mongoose = require('mongoose');



const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true, unique: true, },
    groupCourse: { type: String, required: String, },
    groupDepartment: { type: String, required: true, },
    groupMembers: { type: Array, required: true, }, 
    groupLeader: { type: String, required: true, },
});


const Group = mongoose.model('Group', groupSchema);
module.exports = Group;