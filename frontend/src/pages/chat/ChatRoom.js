import { useState, useEffect, useRef } from "react";
//import { getMessagesOfChatRoom } from "../../services/ChatService";
import Message from "./Message";
//import Contact from "./contact";
import Chatbox from "./chatbox";
import { db } from "../../config/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, onSnapshot, setDoc, collection, getDoc, arrayUnion } from "firebase/firestore";
import 'firebase/firestore';

export default function ChatRoom({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const buildDocKey = (friend) => [currentUser.username, friend].sort().join(":");
  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await getMessagesOfChatRoom(currentChat);
    //   setMessages(res);
    // };

    const fetchDataFromFirebase = async () => {
      function debounce(callback, delay) {
        let timeoutId;
        return function (...args) {
          clearTimeout(timeoutId);

          timeoutId = setTimeout(() => {
            callback.apply(this, args);
          }, delay);
        };
      }
      const handleSnapshot = (doc) => {
        //console.log('Snapshot received:', doc);
        if (doc.exists()) {
          const dt = doc.data()?.messages
          if (dt) {
            setMessages(dt.slice(-100));//for perf limit to last 50 msgs
          }
        }
        else {
          setMessages([]);
        }
      };
      const debouncedHandleSnapshot = debounce(handleSnapshot, 1200);
      const docKey = buildDocKey(
        currentChat.friend
      )
      const docRef = doc(collection(db, 'chats'), docKey)
      const unsubscribe = onSnapshot(docRef, debouncedHandleSnapshot);
      return () => {
        unsubscribe();
      };
    };

    //fetchData();
    fetchDataFromFirebase();
  }, [currentChat, messages]);

  useEffect(() => {
    const scrollToBottom = () => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);
  
  const generateRandomString = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  }
  const handleFormSubmit = async (message, fileInfo) => {
    // const messageBody = {
    //   friend: currentChat.friend,
    //   user: currentUser.username,
    //   msg: message,
    // };
    // const res = await sendMessage(messageBody);
    // //setMessages([...messages, res]);
    // const resmsg = await getMessagesOfChatRoom(currentChat);
    //setMessages(resmsg);
    if (!fileInfo && !message) {
      return;
    }
    const docKey = buildDocKey(currentChat.friend);
    const chatCollection = collection(db, 'chats');
    const customDocRef = doc(chatCollection, docKey);
    const docSnap = await getDoc(customDocRef);

    // Common message object
    const resmsg = {
      friend: currentChat.friend,
      user: currentUser.username,
      msg: message || "attached file",
      isRead: false,
      createdAt: Date.now(),
    };
    const metadata = {
      customMetadata: {
        key: 'myappx'
      }
    };
    // Upload file if available
    if (fileInfo) {
      const filePath = `images/${generateRandomString(15)}/${fileInfo.name}`;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);
      
      const uploadTask = uploadBytesResumable(storageRef, fileInfo, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            const r = {
              FileUrl: downloadURL,
              storageUri: filePath,
              FileName: fileInfo.name,
              ...resmsg, // Include common message properties
            };
            await updateDoc(customDocRef, { messages: arrayUnion(r) });
            setMessages([...messages, r]);
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      );
    }

    // If document does not exist, create it with the message
    if (!docSnap.exists()) {
      await setDoc(customDocRef, { messages: arrayUnion(resmsg) }, { merge: true });
    } else {
      // If file not uploaded, update the document with the message
      if (!fileInfo) {
        await updateDoc(customDocRef, { messages: arrayUnion(resmsg) });
      }
    }

    // Update local state with the new message
    if (!fileInfo)
      setMessages([...messages, resmsg]);

  };

  return (
    <div>
      <div className="w-full">
        {/* <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-bottom">
          <Contact chatRoom={currentChat} currentUser={currentUser} />
        </div> */}
        <div className="position-relative w-100 p-6 overflow-y-auto custom-chat-box">
          <ul style={{paddingInlineStart:'5px'}}>
            {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={message} self={currentUser.username} />
              </div>
            ))}
          </ul>
        </div>

      </div>
      <Chatbox handleFormSubmit={handleFormSubmit} />
    </div>
  );
}
