const express = require('express')
const { getAllTasks, updateTaskById, insertTask, getTaskById, deleteTaskById } = require('../controllers/task.controller')

const router = express.Router()

router.get('/all', getAllTasks)
router.put('/update', updateTaskById)
router.post('/create', insertTask)
router.get('/retrieve', getTaskById)
router.put('/delete', deleteTaskById)

module.exports = router