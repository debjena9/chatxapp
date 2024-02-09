const express = require('express');
const {
    registerUser,
    loginUser,
    getAllUsers,
    getMe,
    getUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

// Routes 
router.post('/', registerUser)
router.get('/', protect,getAllUsers)
router.post('/login', loginUser)
router.get('/me', protect, getMe) // protect middleware will run first and makes the route Private
router.get('/:username', protect, getUser) // protect middleware will run first and makes the route Private

module.exports = router;