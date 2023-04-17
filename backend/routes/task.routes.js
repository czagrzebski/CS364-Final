const express = require('express')
const { getAllTasks, updateTaskById, insertTask } = require('../controllers/task.controller')

const router = express.Router()

router.get('/all', getAllTasks)
router.put('/update', updateTaskById)
router.post('/create', insertTask)

module.exports = router