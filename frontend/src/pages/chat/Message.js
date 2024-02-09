import React from 'react';
import moment from 'moment';
import { ListGroup, Col } from 'react-bootstrap';

const Message = ({ message, self }) => {
  const isSelf = self === message.user;

  return (
    <ListGroup.Item className={`d-flex ${isSelf ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className='p-1'>
        <Col
          className={`p-2 rounded-xl shadow ${isSelf
            ? 'bg-primary text-white'
            : 'bg-custom-light text-dark border border-secondary'
            }`} style={{ borderRadius: isSelf ? '20px 20px 0 20px' : '20px 20px 20px 0' }}
        >
          <div className="d-flex align-items-center">
            <img
              className="chat-img"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(message.user)}&background=random&color=fff`}
              alt="user avatar"
            />
            <span className="block font-normal ml-2 p-1 text-break" style={{ fontSize: '13px' }}>{message.msg}
            {message.FileName ? (
              <p style={{ color: isSelf ? "#fff":"#07b107" }}>
                <a href={message.FileUrl} style={{ color: isSelf ? "#fff":"#07b107" }} rel="noreferrer" target="_blank" download>
                  {message.FileName}
                </a>{" "}
              </p>
            ) : (
              ""
            )}
            </span>
            
          </div>
        </Col>
        <span className="block text-sm text-dark" style={{ float: isSelf ? 'right' : 'left', fontSize: '11px' }}>
          {moment(message.createdAt).fromNow()}
        </span>
      </div>
    </ListGroup.Item>
  );
};

export default Message;
