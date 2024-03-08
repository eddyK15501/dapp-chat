/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from './components/Navigation';
import Server from './components/Server';
import Channels from './components/Channels';
import Messages from './components/Messages';

import DappChatABI from '../abi/Dappchat.json';

import config from '../config/config.json';

function App() {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState({});
  const [contract, setContract] = useState({});

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

        // Get Channel
        

        window.ethereum.on('accountsChanged', async () => {
          window.location.reload();
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
