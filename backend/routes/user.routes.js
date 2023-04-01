const express = require('express')
const { getAllUsers, getUserById, createUser } = require('../controllers/user.controller')

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/user', getUserById);
router.post('/createuser', createUser);

module.exports = router;