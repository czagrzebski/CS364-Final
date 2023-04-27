const express = require('express')
const { getAllDepts, createDept} = require('../controllers/dept.controller')

const router = express.Router()

router.get('/all', getAllDepts)
router.post('/create', createDept)

module.exports = router