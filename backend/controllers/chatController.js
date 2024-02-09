const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const Room = require('../models/chatRoomModel');

// @desc    Get old messages
// @route   GET /api/messages/getOldMsg
// @access  Private
const getOldMsg = asyncHandler(async (req, res) => {
  try {
    const otheruser = req.body.otheruser;
    const myName = req.user.username;
    const query = {
      $or: [
        { user: myName, friend: otheruser },
        { user: otheruser, friend: myName },
      ],
    };
    const oldMsgs = await Chat.find(query);
    res.status(200).json(oldMsgs);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

// @desc    Get connected users
// @route   GET /api/messages/connecteduser
// @access  Private
const getConnectedUser = asyncHandler(async (req, res) => {
  try {
    const connectedUsers = await Room.find({ user: req.user.username });
    res.status(200).json(connectedUsers);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

// @desc    Get messages
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Chat.find({
      friend: req.params.friend,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

// @desc    Create message
// @route   POST /api/messages
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
  const newMessage = new Chat(req.body);

  try {
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

module.exports = {
  createMessage,
  getMessages,
  getConnectedUser,
  getOldMsg,
};
