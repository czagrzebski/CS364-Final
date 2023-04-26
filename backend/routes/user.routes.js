const express = require('express')
const { getAllUsers, getUserById, createUser, updateUser } = require('../controllers/user.controller')

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/user', getUserById);
router.post('/create', createUser);
router.put('/update', updateUser);

module.exports = router;