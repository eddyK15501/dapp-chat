/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

import person from '../assets/person.svg';
import send from '../assets/send.svg';

// Web Socket
const socket = io('ws://localhost:8080');

const Messages = ({ account, messages, currentChannel }) => {
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef(null);

  const filteredMessages = messages.filter((message) => {
    return message.channel == currentChannel?.id.toString();
  });

  const handleSendMessage = async (event) => {
    event.preventDefault();

    // Send new message to the server
    const messageObj = {
      channel: currentChannel.id.toString(),
      account: account,
      text: newMessage,
    };

    if (newMessage) {
      socket.emit('new message', messageObj);
    }

    setNewMessage('');
  };

  useEffect(() => {
    // Scroll new messages into view
    const handleScroll = () => {
      setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    };

    handleScroll();
  });

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
        {currentChannel && account ? (
          <>
            <input
              type='text'
              value={newMessage}
              placeholder={`Add a new message: #${currentChannel.name}`}
              style={{ outline: 'none' }}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type='submit'>
              <img src={send} alt='Send Icon' />
            </button>
          </>
        ) : (
          <>
            <input
              type='text'
              value=''
              placeholder='Please connect your wallet / Join the Channel'
              disabled
            />
            <button type='submit' disabled>
              <img src={send} alt='Send Icon' />
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Messages;
