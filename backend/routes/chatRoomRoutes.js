const express = require('express');
const {
    initChat,
    getChatRoomOfUser
} = require('../controllers/chatRoomController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

router.post("/",protect, initChat);
router.get("/", protect,getChatRoomOfUser);

module.exports = router;