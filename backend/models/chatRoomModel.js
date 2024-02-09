const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
  {
    user: String,
    friend: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ChatRoom = mongoose.model('chatRoom', chatRoomSchema);

module.exports = ChatRoom;
