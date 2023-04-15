const Student = require("../models/student.model");
const createError = require("http-errors");

module.exports.exists = (req, res, next) => {
  const studentId = req.params.studentId || req.params.id;
  if (studentId === 'me') {
    if (req.user) {
      req.student = req.user;
      next();
    } else {
      next(createError(401, "Missing access token"));
    }
  } else {
    Student.findById(studentId)
      .populate("projects")
      .then((student) => {
        if (student) {
          req.student = student;
          next();
        } else {
          next(createError(404, "Student not found"));
        }
      })
      .catch(next);
  }
  
};
