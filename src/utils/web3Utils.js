import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from 'web3modal';

const options = {
  
  binancechainwallet:{
    package:true,
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, 
    options: {
      appName: "Coinbase",
      infuraId: import.meta.env.VITE_REACT_APP_INFURA_ID ,
      chainId:11155111
    }
  },
  walletconnect: {
    package: WalletConnectProvider, 
    options: {
      infuraId: import.meta.env.VITE_REACT_APP_INFURA_ID ,
      chainId:11155111
    }
  }
}

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: options,
  theme: 'dark',
  disableInjectedProvider: false,
});
export { web3Modal }