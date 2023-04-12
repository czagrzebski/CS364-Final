const express = require('express')
const { getAllTasks, updateTaskById } = require('../controllers/task.controller')

const router = express.Router()

router.get('/all', getAllTasks)
router.put('/update', updateTaskById)

module.exports = router