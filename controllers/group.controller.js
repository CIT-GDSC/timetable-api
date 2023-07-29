const Group = require('../services/Group.service');
const Student = require('../services/student.service');
const expressAsyncHandler = require('express-async-handler');



const newGroup = expressAsyncHandler(async (req, res) => {
    const { groupName, groupCourse, groupDepartment, groupMembers, groupLeader } = req.body;

    if (!groupName || !groupCourse || !groupDepartment || !groupMembers || !groupLeader) {
        res.status(400);
        throw new Error('Fields cannot be blank')
    }
    /**validate the student leader and add the field of student leader
     * student leader has to exist in the database
     * one student can only be part of one group
    */
    const validateStudent = await Student.findOne(groupMembers);
    const checkLeader = await Student.findOne(groupLeader);
    const validateGroup = await Group.findOne(groupName);

    if (!validateStudent || !checkLeader) {
        res.status(404);
        throw new Error("Could not find the group leader or the student ");
    }
    if (validateGroup) {
        res.status(400);
        throw new Error("error, please provide a different username")
    }
    try {
        /**
         * create group
         */
        const group = await Group.create({
            groupName,
            groupCourse,
            groupDepartment,
            groupMembers,
            groupLeader
        });
        await group.save();
        if (group) {
            res.status(200);
            res.json({
                leader: group.groupLeader,
                groupName: group.groupName,
                groupCourse: group.groupCourse,
                department: group.groupDepartment,
                Members: group.groupMembers,
            });
        } else {
            res.status(406);
            throw new Error('Bad request, could not validate the request');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
});


const findGroup = expressAsyncHandler(async (req, res) => {
    const { groupName } = req.body;
    const validateGroup = await Group.findOne(groupName);
    if (!validateGroup) {
        res.status(403);
        res.json("Could not find the group by the provided Name");
    }
    try {
        res.status(200)
        res.json({
            Name: validateGroup.groupName,
            Leader: validateGroup.groupLeader,
            members: validateGroup.groupMembers,
            course: validateGroup.groupCourse,
            department: validateGroup.groupDepartment,
        });
    } catch (error) {
        res.status(500);
        throw new Error("something went wrong, try again later");
    }
}, { collection: studentGroups });


const findByGroupById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params.id;
    try {
        const foundGroup = await Group.findById({ _id: id });
        if (!foundGroup) {
            res.status(403);
            res.json("status error 403! Not found");
        } else {
            res.status(202);
            res.json({
                groupName: foundGroup.groupName,
                leader: foundGroup.groupLeader,
                department: foundGroup.groupDepartment,
                members: foundGroup.groupMembers,
                course: foundGroup.groupCourse
            });
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
}); 0

const deleteGroup = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const findGroup = await Group.findByIdAndDelete({ _id: id });
    if (findGroup) {
        res.status(200).json({ message: "groupDeleted" });
    }
});
module.exports = { findGroup, newGroup, findByGroupById };