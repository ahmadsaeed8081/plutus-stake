/* eslint-disable no-unused-vars */
import React from "react";

import "./css/App.scss";
import "./index.css";

import Routing from "./routes/Routing";


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'YOUR_PROJECT_ID'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
function App({ Component, pageProps }) {

  return (
    <>

        <WagmiConfig config={wagmiConfig}>
          <Routing {...pageProps} />
        </WagmiConfig>


      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
