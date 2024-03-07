/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from './components/Navigation';
import Server from './components/Server';
import Channels from './components/Channels';
import Messages from './components/Messages';

import config from '../config/config.json';

function App() {
  const [account, setAccount] = useState('');

  const fetchContractABI = async () => {
    try {
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', async () => {
          window.location.reload();
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContractABI();
  }, []);

  return (
    <>
      <div>
        <Navigation account={account} setAccount={setAccount} />
        <main>
          <Server />
          <Channels />
          <Messages />
        </main>
      </div>
    </>
  );
}

export default App;
