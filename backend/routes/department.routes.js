const express = require('express')
const { getAllDepts, createDept} = require('../controllers/dept.controller')
const { verifyToken } = require('../controllers/auth.controller')

const router = express.Router()

router.get('/all', verifyToken, getAllDepts)
router.post('/create', verifyToken, createDept)

module.exports = router