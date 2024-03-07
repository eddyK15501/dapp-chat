/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from '../components/Navigation';

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
        <main></main>
      </div>
    </>
  );
}

export default App;
