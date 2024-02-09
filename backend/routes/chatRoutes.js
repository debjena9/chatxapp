const express = require('express');
const {
    createMessage, getMessages,getConnectedUser,getOldMsg
} = require('../controllers/chatController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router({ mergeParams: true });

// Routes
router.route('/')
    .get(protect, getMessages)
    .post(protect, createMessage)
router.get("/connecteduser",protect, getConnectedUser);
router.post("/getOldMsg", protect,getOldMsg);
module.exports = router;