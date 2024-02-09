const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    user: String,
    friend: String,
    msg: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
