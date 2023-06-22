import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiFillCloseCircle } from "react-icons/ai"
import { HiOutlineBars3BottomRight } from "react-icons/hi2"
import { web3Modal } from "../utils/web3Utils";
import Web3 from "web3"
import { contractAbi, contractAddress } from "../utils/constants";
import { setContract, setProvider, setOwner } from "../redux/nftsStore"
import { useDispatch } from "react-redux";

function Nav() {
    const dispatch = useDispatch();
    const navRef = useRef();
    const [connected, setConnected] = useState(false);
    const toggleNav = () => {
        navRef.current.classList.toggle("active");
    }
    BigInt.prototype.toJSON = function () {
        return this.toString()
    };
    const checkIfConnected = async () => {
        if (web3Modal.cachedProvider) {
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            const contract = new web3.eth.Contract(contractAbi, contractAddress);
            dispatch(setOwner(account));
            dispatch(setContract(contract));
            dispatch(setProvider(web3));
            setConnected(true);
        }
    }
    useEffect(() => {
        checkIfConnected();
    }, [])

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            const contract = new web3.eth.Contract(contractAbi, contractAddress);
            dispatch(setOwner(account));
            dispatch(setContract(contract));
            dispatch(setProvider(web3));
            setConnected(account);
            const res = await contract.methods.getOwner().call();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    //
    const disconnect = async () => {
        web3Modal.clearCachedProvider();
        window.localStorage.clear("WEB3_CONNECT_CACHED_PROVIDER");
        setConnected(false);
    }
    return (
        <nav>
            <a href='/' className="logo">
                STRT<span>NFT</span>
            </a>
            <ul ref={navRef}>
                <AiFillCloseCircle className='close' onClick={toggleNav} />
                <li><Link to="/collection/" onClick={toggleNav}>MarketPlace</Link></li>
                <li><Link to="#" onClick={toggleNav}>Community</Link></li>
                <li><Link to="/mynft" onClick={toggleNav}>MyNFT</Link></li>
                <li><Link to="/create" onClick={toggleNav}>Create</Link></li>
                {!connected ?
                    <button onClick={connectWallet}>
                        Connect Wallet
                    </button>
                    :
                    <button onClick={disconnect}>
                        Disconnect Wallet
                    </button>
                }
            </ul>
            <HiOutlineBars3BottomRight className='menu' onClick={toggleNav} />
        </nav>
    )
}

export default Nav

// remember to import react-redux