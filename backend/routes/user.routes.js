const express = require('express')
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller')
const { verifyToken } = require('../controllers/auth.controller')

const router = express.Router();

router.get('/all', verifyToken, getAllUsers);
router.get('/user', verifyToken, getUserById);
router.post('/create', verifyToken, createUser);
router.put('/update', verifyToken, updateUser);
router.put('/delete', verifyToken, deleteUser);

module.exports = router;