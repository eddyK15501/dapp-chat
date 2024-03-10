/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Channels = ({ account, provider, contract, channels }) => {
  const handleChannel = async (channel) => {
    const hasJoined = await contract.hasJoined(channel.id, account);

    if (hasJoined) {
      console.log("Joined.")
    } else {
      console.log("Minting required.")
    }
  };

  return (
    <div className='channels'>
      <div className='channels__text'>
        <h2>Text Channels</h2>
        <ul>
          {channels.map((channel) => {
            return (
              <li
                key={channel[0].toString()}
                onClick={() => handleChannel(channel)}
              >
                {channel.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className='channels__voice'>
        <h2>Voice Channels</h2>
        <ul>
          <li>Channel 1</li>
          <li>Channel 2</li>
          <li>Channel 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Channels;
