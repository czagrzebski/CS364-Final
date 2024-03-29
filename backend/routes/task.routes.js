const express = require('express')
const { getAllTasks, updateTaskById, insertTask, getTaskById, deleteTaskById, mostProductiveThanAverageEmployee, getMostProductiveEmployeeByDepartment } = require('../controllers/task.controller')
const { verifyToken } = require('../controllers/auth.controller')

const router = express.Router()

router.get('/all', verifyToken, getAllTasks)
router.put('/update', verifyToken, updateTaskById)
router.post('/create', verifyToken, insertTask)
router.get('/retrieve', verifyToken, getTaskById)
router.put('/delete', verifyToken, deleteTaskById)
router.get('/most-productive', verifyToken, mostProductiveThanAverageEmployee)
router.get('/most-productive-by-department', verifyToken, getMostProductiveEmployeeByDepartment)

module.exports = router