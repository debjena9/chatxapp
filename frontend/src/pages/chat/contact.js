import { useState, useEffect } from "react";
import { getUser } from "../../services/ChatService";

export default function Contact({ chatRoom, onlineUsersId, currentUser }) {
  const [contact, setContact] = useState();

  useEffect(() => {
    const { friend: contactId } = chatRoom;

    const fetchData = async () => {
      try {
        const res = await getUser(contactId);
        setContact(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [chatRoom, currentUser]);

  return (
    <div className="d-flex align-items-center">
      <img
        className="img-fluid rounded-circle"
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact?.username)}&background=random&color=fff`}
        alt=""
        style={{ width: "1.5rem", height: "1.5rem" }}
      />
      <span className="ml-2 text-gray-500 dark:text-gray-400" style={{ paddingLeft: '5px' ,fontSize: '.9rem'}}>
        {contact?.username}
      </span>
    </div>
  );
}
