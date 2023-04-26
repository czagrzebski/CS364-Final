const express = require('express')
const {getAllDepts} = require('../controllers/dept.controller')

const router = express.Router()

router.get('/all', getAllDepts)

module.exports = router