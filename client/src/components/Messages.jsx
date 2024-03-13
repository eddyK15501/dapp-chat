/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

import person from '../assets/person.svg';
import send from '../assets/send.svg';

// Web Socket
const socket = io('ws://localhost:8080');

const Messages = ({ account, messages, currentChannel }) => {
  const messageEndRef = useRef(null);

  const filteredMessages = messages.filter((message) => {
    return message.channel == currentChannel?.id.toString();
  });

  const handleSendMessage = () => {};

  useEffect(() => {
    console.log(messages);
    console.log(currentChannel);
  }, [messages, currentChannel]);

  return (
    <div className='text'>
      <div className='messages'>
        {filteredMessages.map((message, index) => (
          <div className='message' key={index}>
            <img src={person} alt='Person Icon' />
            <div className='message_content'>
              <h3>{`${message.account.slice(0, 6)}...${message.account.slice(
                38,
                42
              )}`}</h3>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSendMessage}>
        <input type='text' />
        <button type='submit'>
          <img src={send} alt='Send Icon' />
        </button>
      </form>
    </div>
  );
};

export default Messages;
