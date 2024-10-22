const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentCode: { type: String, unique: true, required: true },
  isActive: { type: Boolean, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
