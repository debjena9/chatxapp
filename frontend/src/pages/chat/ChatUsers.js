import React, { useState, useEffect } from "react";
import { createChatRoom } from "../../services/ChatService";
import Contact from "./contact";
import { ListGroup } from 'react-bootstrap';

function ChatUsers({
  users,
  chatRooms,
  setChatRooms,
  onlineUsersId,
  currentUser,
  changeChat,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [nonContacts, setNonContacts] = useState([]);
  //const [contactIds, setContactIds] = useState([]);

  useEffect(() => {
    const ids = chatRooms.map((room) => room.friend);
    //setContactIds(ids);
    setNonContacts(
      users.filter(
        (user) => user._id !== currentUser._id && !ids.includes(user.username)
      )
    );
  }, [chatRooms, users, currentUser._id]);

  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  const handleNewChatRoom = async (user) => {
    const members = { otheruser: user.username };
    try {
      const res = await createChatRoom(members);
      setChatRooms((prevChatRooms) => [...prevChatRooms, res]);
      changeChat(res);
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
      <ListGroup className="overflow-auto h-75">
        <h2 className="my-2 mb-2 ml-2 text-dark" style={{ fontSize: '1rem' }}>Users</h2>
        {chatRooms?.map((chatRoom, index) => (
          <ListGroup.Item
            key={index}
            action
            active={index === selectedChat}
            onClick={() => changeCurrentChat(index, chatRoom)}
          >
            <Contact chatRoom={chatRoom} onlineUsersId={onlineUsersId} currentUser={currentUser} />
          </ListGroup.Item>
        ))}

        {nonContacts.map((nonContact, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleNewChatRoom(nonContact)}
            className="d-flex align-items-center"
          >
            <img
              className="img-fluid rounded-circle"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nonContact?.username)}&background=random&color=fff`}
              alt=""
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
            <span className="ml-2 text-gray-500 dark:text-gray-400" style={{ paddingLeft: '5px', fontSize: '.9rem' }}>
              {nonContact?.username}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
  );
}

export default ChatUsers;
