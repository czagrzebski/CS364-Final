const express = require('express')
const { getAllTasks, updateTaskById, insertTask, getTaskById, deleteTaskById, mostProductiveThanAverageEmployee } = require('../controllers/task.controller')

const router = express.Router()

router.get('/all', getAllTasks)
router.put('/update', updateTaskById)
router.post('/create', insertTask)
router.get('/retrieve', getTaskById)
router.put('/delete', deleteTaskById)
router.get('/most-productive', mostProductiveThanAverageEmployee)

module.exports = router