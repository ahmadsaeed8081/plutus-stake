import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConnectWallet from "../ConnectWallet";
import Modal from "../../components/Modal";
import { MenuIcon } from "../../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../../store/reducers/globalReducer";
import Web3 from "web3";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { cont_address, cont_abi, tokenABI, Token_address } from "../config";

const Header = (props) => {



  const [_address, set_user_address] = useState(null);
  const [_web3, set_web3] = useState(null);









  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const dispatch = useDispatch();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMenuMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMenuMouseLeave = () => {
    setMenuVisible(false);
  };

  const handleMenuItemClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };



  async function Sign_out() {
   const provider = await EthereumProvider.init({
      rpc: {
         137:"https://polygon-mainnet.g.alchemy.com/v2/bf3cnZO2AQyu_Kv4eBx6uI0Slhs5GhMv"
       },
       chainId: 137,
     });
     try {
       await provider.disconnect();
       window.location.reload("/");
     } catch {
           window.location.reload("/");
 
     }
   }
 
   async function Connect_Wallet(id) {
     let provider;
     let web3;
     let accounts;
 
     const NETWORK_ID = "137";
     const NETWORK_ID_hex = "0x89";
     // const NETWORK_ID = "80001";
     // const NETWORK_ID_hex = "0x13881";
     // set_id(id);
     if (id == "1") {
       //metmask
       provider = window.ethereum;
       console.log("meta and trust provider");
       // alert(provider._metamask);
       console.log(provider.isMetaMask);
       web3 = new Web3(provider);
       const networkId = await web3.eth.net.getId();
       set_web3(web3);
       if (networkId == NETWORK_ID) {
         accounts = await provider.request({ method: "eth_requestAccounts" });
         set_user_address(accounts[0]);
         setOpenConnectWallet(false);
         const contract1 = new web3.eth.Contract(tokenABI, Token_address);
 
         let balance = await contract1.methods.balanceOf(accounts[0]).call();
 
         let matic = await web3.eth.getBalance(accounts[0]);
         balance = web3.utils.fromWei(balance, "ether");
         matic = web3.utils.fromWei(matic, "ether");
 
         props.set_user(accounts[0], web3, provider, balance, matic);
 
         console.log("object" + matic);
       } else {
         try {
           await provider.request({
             method: "wallet_switchEthereumChain",
             params: [{ chainId: NETWORK_ID_hex }],
           });
           Connect_Wallet(id);
         } catch {}
       }
     } 
    //else if (id == "2") {
    //    //trust 1Wallet
    // provider = await EthereumProvider.init({
      //      rpc: {
    //        137:"https://polygon-mainnet.g.alchemy.com/v2/bf3cnZO2AQyu_Kv4eBx6uI0Slhs5GhMv"
    //      },
    //      chainId: 137,
    //    });
 
    //    console.log(provider);
    //    console.log(provider.wc.peerMeta);
    //    await provider.enable();
 
    //    console.log("this is provider");
    //    console.log(provider.wc.peerMeta.name);
 
    //    web3 = new Web3(provider);
 
    //    const networkId = await web3.eth.net.getId();
    //    console.log("yguygy7 " + networkId);
    //    if (networkId == NETWORK_ID) {
    //      accounts = await web3.eth.getAccounts();
    //      set_user_address(accounts[0]);
    //      setOpenWallet(false);
 
    //      const contract1 = new web3.eth.Contract(tokenABI, Token_address);
 
    //      let balance = await contract1.methods.balanceOf(accounts[0]).call();
 
    //      let matic = await web3.eth.getBalance(accounts[0]);
    //      balance = web3.utils.fromWei(balance, "ether");
    //      matic = web3.utils.fromWei(matic, "ether");
    //      props.set_user(accounts[0], web3, provider, balance, matic);
    //    }
    //  } 
     else if (id == "3") {
      console.log("object wallet connect");
       //Wallet connect
        provider = await EthereumProvider.init({
        projectId: '9dc66ab4d76b28b1a452d5dc0083e466', // required
        chains: [1], // required
        // showQrModal: true // requires @walletconnect/modal
      })
       await provider.enable();
    
 
    //    console.log("this is provider");
    //    console.log(provider.wc.peerMeta);
 
    //    web3 = new Web3(provider);
 
    //    const networkId = await web3.eth.net.getId();
    //    console.log("yguygy7 " + networkId);
    //    if (networkId == NETWORK_ID) {
    //      accounts = await web3.eth.getAccounts();
    //      set_user_address(accounts[0]);
    //      setOpenConnectWallet(false);
 
    //      const contract1 = new web3.eth.Contract(tokenABI, Token_address);
 
    //      let balance = await contract1.methods.balanceOf(accounts[0]).call();
 
    //      let matic = await web3.eth.getBalance(accounts[0]);
 
    //      balance = web3.utils.fromWei(balance, "ether");
    //      matic = web3.utils.fromWei(matic, "ether");
 
    //      props.set_user(accounts[0], web3, provider, balance, matic);
    //    } else {
    //      if (provider.wc.peerMeta.name == "MetaMask") {
    //        await provider.request({
    //          method: "wallet_switchEthereumChain",
    //          params: [{ chainId: "0x89" }],
    //        });
    //        Connect_Wallet(id);
    //      } else {
    //       setOpenConnectWallet(false);
 
    //        await provider.disconnect();
    //        alert("Kindly change your network to polygon");
    //      }
    //    }
     }
    //  set_web3(web3);
   }









  return (
    <div className="header-camp flex bg-themeColor">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <div className="logo-img flex items-center justify-center">
            <Link to="/">
              <img src="../images/logo.svg" className="logo" />
            </Link>
          </div>
          <div
            className="menu-icon flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setOpenSidebar(true));
            }}
          >
            <MenuIcon />
          </div>
        </div>
        <div className="center flex items-center justify-center">
          <div className="menu-list flex items-center">
            <div
              className="menu-item"
              onClick={() => handleMenuItemClick("home")}
            >
              Home
            </div>
            <div className="menu-item">Staking</div>
            <div className="menu-item">Dao (Coming Soon)</div>
            <div className="flex relative">
              <div
                className="menu-item"
                onMouseEnter={() => setMenuVisible(true)}
                onMouseLeave={() => setMenuVisible(false)}
              >
                Knowledge
              </div>
              {isMenuVisible && (
                <div
                  className="sub-menu flex flex-col"
                  onMouseEnter={handleMenuMouseEnter}
                  onMouseLeave={handleMenuMouseLeave}
                >
                  <a
                    href="https://www.plutus.exchange/whitepaper"
                    target="_blank"
                    className="sub-menu-item"
                  >
                    Whitepaper
                  </a>
                  <div className="sub-menu-item">GitBook</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right flex items-center justify-end">
          <div className="action flex items-center justify-center">
            <button
              className="btn-connect button"
              onClick={(e) => setOpenConnectWallet(true)}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={openConnectWallet}
        onClose={() => setOpenConnectWallet(false)}
      >
        <ConnectWallet setOpenConnectWallet={setOpenConnectWallet} Connect_Wallet={Connect_Wallet} />
      </Modal>
    </div>
  );
};

export default Header;
