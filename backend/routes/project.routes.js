const express = require('express')
const { getAllProjects } = require('../controllers/project.controller')

const router = express.Router()

router.get('/all', getAllProjects)

module.exports = router