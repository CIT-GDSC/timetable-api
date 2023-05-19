//add a course to the database




const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');


// @desc    Add a course
//@private: true

const addCourse = asyncHandler(async (req, res) => {
    const { courseCode, courseName, courseDepartment, HeadOfDepartment } = req.body;
    if (!courseCode || !courseName || !courseDepartment || !HeadOfDepartment) {
        res.status(400);
        throw new Error('Invalid or no data passed, refusing to continue');
    }
    const validateCourse = await Course.findOne({ courseCode });
    try {
        if (validateCourse) {
            res.status(400);
            throw new Error('Course already exists');
        }
        const course = await Course.create({
            courseCode,
            courseName,
            courseDepartment,
            HeadOfDepartment
        });
        if (course) {
            res.status(201).json({
                _id: course._id,
                courseCode: course.courseCode,
                courseName: course.courseName,
                courseDepartment: course.courseDepartment,
                HeadOfDepartment: course.HeadOfDepartment
            });
        } else {
            res.status(400);
            throw new Error('Invalid data passed, refusing to continue');
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});

//@desc update a course
//@private: true

const updateCourse = asyncHandler(async (req, res) => {
    const { courseCode, courseName, courseDepartment, HeadOfDepartment } = req.body;
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            course.courseCode = courseCode;
            course.courseName = courseName;
            course.courseDepartment = courseDepartment;
            course.HeadOfDepartment = HeadOfDepartment;

            const updatedCourse = await course.save();
            res.json({
                _id: updatedCourse._id,
                courseCode: updatedCourse.courseCode,
                courseName: updatedCourse.courseName,
                courseDepartment: updatedCourse.courseDepartment,
                HeadOfDepartment: updatedCourse.HeadOfDepartment
            });
        } else {
            res.status(404);
            throw new Error('Course not found');
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


//@desc get all courses
//@private: false


const getCourses = asyncHandler(async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});



const getCourseById = asyncHandler(async (req, res) => {
    const { courseCode } = req.body;
    try {
        const course = await Course.findOne({ courseCode });
        if (course) {
            res.json(course);
        } else {
            res.status(404);
            throw new Error('Course not found');
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


module.exports = { addCourse, updateCourse, getCourses, getCourseById };
