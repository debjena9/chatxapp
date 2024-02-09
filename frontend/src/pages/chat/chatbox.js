import { useState, useRef } from "react";
import { FaPlay, FaPaperclip, FaTimes } from "react-icons/fa";

export default function Chatbox(props) {
  const [message, setMessage] = useState("");
  const scrollRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    props.handleFormSubmit(message, selectedFile);
    setMessage("");
    handleRemoveFile();
  };

  return (
    <div ref={scrollRef} className="border-top">
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex align-items-center justify-content-between w-full p-2 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="position-relative flex-grow-1 mr-3">
            <input
              type="text"
              placeholder="Write a message"
              className="form-control py-2 pl-10 pr-3 bg-gray-50 text-gray-900 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {selectedFile && (
              <div style={{ marginTop: '2.5px', right: '2px' }} className="d-flex align-items-center bg-custom-light position-absolute top-0 border rounded">
                <p className="mr-1 mb-1 p-1" style={{ fontSize: '12px', marginTop: '5px' }}>{selectedFile.name}</p>
                <label onClick={handleRemoveFile} style={{ paddingLeft: "5px", paddingTop: '3px' }} className="btn rounded-circle">
                  <FaTimes style={{ color: "red", fontSize: '10px' }} />
                </label>
              </div>

            )}
          </div>
          <input
            type="file"
            className="form-control"
            id="formFile"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="formFile" style={{ paddingRight: '0px', paddingLeft: '5px' }} className="btn rounded-circle">
            <FaPaperclip
              className="custom-font" style={{ color: "#07b107" }}
            />
          </label>
          <button className="btn rounded-circle" style={{ paddingRight: '1px', paddingLeft: '5px' }} type="submit">
            <FaPlay
              className="custom-font" style={{ color: "#6a1b9a" }}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
