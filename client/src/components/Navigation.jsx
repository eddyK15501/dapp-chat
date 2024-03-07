/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {
  const handleConnect = async () => {
    try {
      if (window.ethereum) {
        // Get MetaMask account
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);

        console.log(account);
      } else {
        alert('Please connect to your MetaMask wallet.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav>
      <div className='nav__brand'>
        <h1>DappChat!</h1>
      </div>
      {account ? (
        <button className='nav__connect'>
          {`${account.slice(0, 7)}...${account.slice(37, 42)}`}
        </button>
      ) : (
        <button className='nav__connect' onClick={handleConnect}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
