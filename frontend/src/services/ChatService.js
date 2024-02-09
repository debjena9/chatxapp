import axios from "axios";
const baseURL = '/api';

const getUserToken = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || null;
};

const createHeader = async () => {
  const token = await getUserToken();

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

const makeRequest = async (method, url, data = null) => {
  const header = await createHeader();

  try {
    const res = await axios({ method, url, data, ...header });
    return res.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getAllUsers = async () => {
  return makeRequest("get", `${baseURL}/users`);
};

export const getUser = async (username) => {
  return makeRequest("get", `${baseURL}/users/${username}`);
};

export const getUsers = async (users) => {
  return makeRequest("get", `${baseURL}/users`, users);
};

export const getChatRooms = async () => {
  return makeRequest("get", `${baseURL}/rooms`);
};

export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
  return makeRequest("get", `${baseURL}/rooms/${firstUserId}/${secondUserId}`);
};

export const createChatRoom = async (members) => {
  return makeRequest("post", `${baseURL}/rooms`, members);
};

export const getMessagesOfChatRoom = async (chat) => {
  const members = {
    otheruser: chat.friend,
    friend: chat._id
  };

  return makeRequest("post", `${baseURL}/messages/getOldMsg`, members);
};

export const sendMessage = async (messageBody) => {
  return makeRequest("post", `${baseURL}/messages`, messageBody);
};
