/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { io } from 'socket.io-client';

import DappChatABI from '../abi/Dappchat.json';
import config from '../config/config.json';

// Components
import Navigation from './components/Navigation';
import Server from './components/Server';
import Channels from './components/Channels';
import Messages from './components/Messages';

// Web Socket
const socket = io('ws://localhost:8080');

function App() {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState({});
  const [contract, setContract] = useState({});
  const [channels, setChannels] = useState([]);

  const [currentChannel, setCurrentChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchContractABI = async () => {
    try {
      if (window.ethereum) {
        // Get Provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        // Get Network for Chain Id
        const network = await provider.getNetwork();
        // Get Deployed Contract
        const dappchat = new ethers.Contract(
          config[network.chainId].Dappchat.address,
          DappChatABI,
          provider
        );
        setContract(dappchat);

        // Get Channels
        const totalChannels = await dappchat.channelIndex();
        const channels = [];

        for (let i = 1; i <= totalChannels.toNumber(); i++) {
          const channel = await dappchat.getChannel(i);
          channels.push(channel);
        }
        setChannels([...channels]);

        window.ethereum.on('accountsChanged', async () => {
          window.location.reload();
          alert('Account has changed. Please reconnect your wallet.');
        });
      } else {
        alert('Please connect to your MetaMask wallet.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContractABI();

    // Connect to Web Socket on "ComponentDidMount()"
    socket.on('connect', () => {
      socket.emit('get messages');
    });

    socket.on('get messages', (messages) => {
      setMessages(messages);
    });

    socket.on('new message', (messages) => {
      setMessages(messages);
    });

    // Disconnect on "ComponentDidUnmount()"
    return () => {
      socket.off('connect');
      socket.off('get messages');
      socket.off('new message');
    };
  }, []);

  return (
    <>
      <div>
        <Navigation account={account} setAccount={setAccount} />
        <main style={{ minHeight: '90vh' }}>
          <Server />
          <Channels
            account={account}
            provider={provider}
            contract={contract}
            channels={channels}
            currentChannel={currentChannel}
            setCurrentChannel={setCurrentChannel}
          />
          <Messages
            account={account}
            messages={messages}
            currentChannel={currentChannel}
          />
        </main>
      </div>
    </>
  );
}

export default App;
