const Student = require('../models/Student');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
      const { fullName, studentCode, isActive } = req.body;
      const student = await Student.create({ fullName, studentCode, isActive });
  
      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: {
          _id: student._id,
          name: student.fullName,
          studentCode: student.studentCode,
          isActive: student.isActive
        }
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
// Get all students
exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.find();
      
      // Format the response data
      const formattedStudents = students.map(student => ({
        _id: student._id,
        name: student.fullName,
        studentCode: student.studentCode,
        isActive: student.isActive
      }));
  
      res.status(200).json({
        success: true,
        data: formattedStudents
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

// Get a student by ID
exports.getStudentById = async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ 
          success: false, 
          message: 'Student not found' 
        });
      }
  
      // Format the student data
      res.status(200).json({
        success: true,
        data: {
          _id: student._id,
          name: student.fullName,
          studentCode: student.studentCode,
          isActive: student.isActive
        }
      });
    } catch (err) {
      res.status(500).json({ 
        success: false, 
        message: err.message 
      });
    }
  };
// Update a student
exports.updateStudent = async (req, res) => {
    try {
      const { name, isActive } = req.body;
  
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { fullName: name, isActive },
        { new: true } // Trả về document đã được cập nhật
      );
  
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }
  
      // Format dữ liệu trả về
      res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        data: {
          _id: student._id,
          name: student.fullName,
          studentCode: student.studentCode,
          isActive: student.isActive
        }
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  };

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
  
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Student deleted successfully'
      });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid student code format'
        });
      }
  
      res.status(500).json({
        success: false,
        message: 'Something went wrong on the server'
      });
    }
  };
