const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Create student
router.post('/', async (req, res) => {
try {
const { name, email, age, course } = req.body;
const newStudent = new Student({ name, email, age, course });
const saved = await newStudent.save();
res.status(201).json(saved);
} catch (err) {
console.error(err);
res.status(500).json({ message: err.message });
}
});


// Get all students
router.get('/', async (req, res) => {
try {
const students = await Student.find().sort({ createdAt: -1 });
res.json(students);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// Get single student
router.get('/:id', async (req, res) => {
try {
const student = await Student.findById(req.params.id);
if (!student) return res.status(404).json({ message: 'Student not found' });
res.json(student);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// Update student
router.put('/:id', async (req, res) => {
try {
const { name, email, age, course } = req.body;
const updated = await Student.findByIdAndUpdate(
req.params.id,
{ name, email, age, course },
{ new: true, runValidators: true }
);
if (!updated) return res.status(404).json({ message: 'Student not found' });
res.json(updated);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// Delete student
router.delete('/:id', async (req, res) => {
try {
const deleted = await Student.findByIdAndDelete(req.params.id);
if (!deleted) return res.status(404).json({ message: 'Student not found' });
res.json({ message: 'Student deleted' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});


module.exports = router;