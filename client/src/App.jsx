/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from '../components/Navigation';

import config from '../config/config.json';

function App() {
  const fetchContractABI = async () => {
    // Get MetaMask account
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    console.log(account);
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
