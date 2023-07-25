const Group = require('../services/Group.service');
const Student = require('../services/student.service');
const expressAsyncHandler = require('express-async-handler');



const newGroup = expressAsyncHandler( async(req, res)=>{
    const {groupName, groupCourse, noOfstudents, groupDepartment, groupMembers, groupLeader } = req.body;

    if(!groupName || !groupCourse || !noOfstudents || !groupDepartment || !groupMembers || !groupLeader){
        res.status(400);
        throw new Error('Fields cannot be blank')
    }
    /**validate the student leader and add the field of student leader
     * student leader has to exist in the database
     * one student can only be part of one group
    */
    const validateStudent = await Student.findOne(groupMembers);
    const checkLeader = await Student.findOne(groupLeader);
    if(!validateStudent || !checkLeader){
        res.status(404);
        throw new Error("Could not find the group leader");
    }
    try {
        /**
         * create group
         */
        const group = await Group.create({
            groupName,
            groupCourse,
            noOfstudents,
            groupDepartment,
            groupMembers,
            groupLeader
        });
        await group.save();
        if(group){
            res.status(200);
            res.json({
                leader: group.groupLeader,
                groupName: group.groupName,
                groupCourse: group.groupCourse,
                noOfstudents: group.noOfstudents,
                department: group.groupDepartment,
                Members: group.groupMembers,
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
});