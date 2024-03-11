/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Channels = ({
  account,
  provider,
  contract,
  channels,
  currentChannel,
  setCurrentChannel,
}) => {
  const handleChannel = async (channel) => {
    const hasJoined = await contract.hasJoined(channel.id, account);

    if (hasJoined) {
      setCurrentChannel(channel);
    } else {
      const signer = await provider.getSigner();
      const transaction = await contract
        .connect(signer)
        .mint(channel.id, { value: channel.cost });
      await transaction.wait();
      setCurrentChannel(channel);
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
                className={
                  currentChannel &&
                  currentChannel.id.toString() == channel.id.toString()
                    ? 'active'
                    : ''
                }
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
