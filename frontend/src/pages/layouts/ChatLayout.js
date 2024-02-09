import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  getChatRooms
} from "../../services/ChatService";
import { useAuth } from "../../AuthContext";

import ChatRoom from "../chat/ChatRoom";
import ChatUsers from "../chat/ChatUsers";
import { FaSearch } from 'react-icons/fa';

export default function ChatLayout() {
  const [users, SetUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [onlineUsersId, setonlineUsersId] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isContact, setIsContact] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const getRandomWelcome = () => {
    const messages = [
      'Welcome!',
      'Hello there!',
      'Greetings!',
      'Nice to see you!',
      'Hi!',
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await getChatRooms();
      if (res)
        setChatRooms(res);
      else {
        setCurrentUser(null);
        localStorage.removeItem('user');
        navigate("/login");
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      if (res)
        SetUsers(res);
      else {
        setCurrentUser(null);
        localStorage.removeItem('user');
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
    setFilteredRooms(chatRooms);
  }, [users, chatRooms]);

  useEffect(() => {
    if (isContact) {
      setFilteredUsers([]);
    } else {
      setFilteredRooms([]);
    }
  }, [isContact]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);

    const searchedUsers = users.filter((user) => {
      return user.username
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase());
    });

    const searchedUsersId = searchedUsers.map((u) => u.username);

    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {
        const isUserContact = searchedUsersId.includes(chatRoom.friend)
        setIsContact(isUserContact);
        isUserContact
          ? setFilteredRooms([chatRoom])
          : setFilteredUsers(searchedUsers);
      });
    } else {
      setFilteredUsers(searchedUsers);
    }
  };

  return (

    <div className="container">
      <div className="row">
        <div className="col-lg-3 border-end border-start border-bottom">
          <div className="mt-3">
            <div className="position-relative">
              <div className="position-absolute mt-1 top-0 start-0 py-2 ps-2 d-flex align-items-center">
                <FaSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                className="form-control py-2 pl-10 pr-3 bg-gray-50 text-gray-900 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                placeholder="Search"
                type="search"
                style={{ paddingLeft: '30px' }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <ChatUsers
            users={searchQuery !== "" ? filteredUsers : users}
            chatRooms={searchQuery !== "" ? filteredRooms : chatRooms}
            setChatRooms={setChatRooms}
            onlineUsersId={onlineUsersId}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>

        <div className="col-lg-9 border-start border-end border-bottom" style={{padding:'0px'}}>
          {currentChat ? (
            <ChatRoom
              currentChat={currentChat}
              currentUser={currentUser}
            />
          ) : (
            <div style={{ minHeight: '85vh',padding:'25px' }} className="d-flex align-items-center justify-content-center ">
            <div className="pl-5">
              <div>
                <h2 className="text-xl text-gray-500 dark:text-gray-400">
                  {getRandomWelcome()} Select a user to start messaging!
                </h2>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
