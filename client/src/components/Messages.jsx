/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import person from '../assets/person.svg';
import send from '../assets/send.svg';

// Web Socket
const socket = io('ws://localhost:8080');

const Messages = ({ account, messages, currentChannel }) => {
  const filteredMessages = messages.filter((message) => {
    return message.channel == currentChannel?.id.toString();
  });

  useEffect(() => {
    console.log(messages);
    console.log(currentChannel);
  }, [messages, currentChannel]);

  return (
    <div className='text'>
      <div className='messages'>
        {filteredMessages.map((message, index) => (
            <div className='message' key={index}>
              {message.text}, {message.channel}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;
