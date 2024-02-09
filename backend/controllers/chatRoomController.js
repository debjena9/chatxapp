const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Room = require('../models/chatRoomModel');

// @desc    create chat room
// @route   POST /api/rooms/
// @access  Private
const initChat = asyncHandler(async (req, res) => {
  const myName = req.user.username;
  const otheruser = req.body.otheruser;
  const senderRoomInfo = new Room({
    user: myName,
    friend: otheruser,
  });

  try {
    await senderRoomInfo.save();
    res.status(200).json(senderRoomInfo);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

// @desc    Get chatRoom of user
// @route   GET /api/rooms/
// @access  Private
const getChatRoomOfUser = asyncHandler(async (req, res) => {
  try {
    const chatRooms = await Room.find({ user: req.user.username });
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = {
  initChat,
  getChatRoomOfUser,
};
