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
        // Get MetaMask account
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
        
        console.log(typeof account);
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
        <Navigation />
        <main></main>
      </div>
    </>
  );
}

export default App;
