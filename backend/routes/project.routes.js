const express = require('express')
const { getAllProjects, createProject, updateProject } = require('../controllers/project.controller')
const { verifyToken } = require('../controllers/auth.controller')

const router = express.Router()

router.get('/all', verifyToken, getAllProjects)
router.post('/create', verifyToken, createProject)
router.put('/update', verifyToken, updateProject)

module.exports = router