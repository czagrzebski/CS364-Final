const express = require('express')
const { getAllProjects, createProject, updateProject } = require('../controllers/project.controller')

const router = express.Router()

router.get('/all', getAllProjects)
router.post('/create', createProject)
router.put('/update', updateProject)

module.exports = router