import React, { useRef, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FaTimesCircle } from "react-icons/fa"
import Card from "../../Card"
import { useDispatch, useSelector } from "react-redux";
import { setNfts } from "../../../redux/nftsStore"
import Spinner from '../../Spinner';
import { AiFillPicture } from 'react-icons/ai';
import { fetchNfts } from "../../../utils/utils";
import Web3 from "web3"


import { ToastContainer, toast } from "react-toastify";

function Collection({ address }) {
    const [auction, setAuction] = useState(false);
    const dispatch = useDispatch();
    const { error, success, contract , owner,provider} = useSelector((state) => state.nftsStore);
    const [nfts, setNfts] = useState(null);
    const [id, setId] = useState(0);
    const biddingRef = useRef();

    const successMsg = (e) =>
        toast(e, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            type: "success",
            theme: "dark",
        });
    const getNfts = async () => {
        const res = await contract.methods.fetchMarketItem().call();
        const paramsData = { contract, res };
        const data = await fetchNfts(paramsData);
        setNfts(data);
    }
    const fetchandFilterNfts = async (txt) => {
        const res = await contract.methods.filterNftCat(txt).call();
        const paramsData = { contract, res };
        const data = await fetchNfts(paramsData);
        setNfts(data);
    }
    // 
    const fetchandFilterNftsByAddress = async (txt) => {
        const res = await contract.methods.filterNftByAdress(txt).call();
        const paramsData = { contract, res };
        const data = await fetchNfts(paramsData);
        setNfts(data);
    }
    
  const bid = async (e) => {
    e.preventDefault();
    const amount = e.target.amount.value.trim()
    const res = await contract.methods.bid(id).send(
      {
        from: owner,
        value: Web3.utils.toWei(amount, "ether")
      }
    );
    // waiting for event
    const latestBlockNumber = await provider.eth.getBlockNumber();
    contract.events.Bid({
      filter: { sender: owner },
      fromBlock: latestBlockNumber,
      toBlock: latestBlockNumber
    })
      .on('data', function (event) {
        if (event.returnValues.sender === owner) {
          successMsg("Bidding Made Successfully")
          biddingRef.current.classList.remove("active");
        }
      })
      .on('error', () => {
        // console.log("Error Occurred", error);
      })

  }
  const toggleBidding = (e) => {
    e.preventDefault();
    setId(e.target.getAttribute("data-index"))
    biddingRef.current.classList.toggle("active");
  }
    useEffect(() => {
        if (contract) {
            getNfts();
        }
    }, [contract]);
    // address
    useEffect(() => {
        if (address !== "") {
            fetchandFilterNftsByAddress(address);
        }
    }, [address])

    const { pathname } = useLocation();
    // 
    useEffect(() => {
        if (pathname !== "/collection/" && pathname !== "/collection/auction") {
            const mainCat = pathname.split("/");
            const cat = mainCat[mainCat.length - 1];
            setAuction(false);
            fetchandFilterNfts(cat);
        } else if (pathname === "/collection/auction") {
            getNfts();
            setAuction(true);
        } else {
            getNfts();
        }
    }, [pathname])
    return (
        <section className="collection">
            <ToastContainer />
            <ul>
                <NavLink to="/collection/">Recent</NavLink>
                <NavLink to="/collection/desktop">Desktop</NavLink>
                <NavLink to="/collection/kitchen">Kitchen</NavLink>
                <NavLink to="/collection/mobile">Mobile</NavLink>
                <NavLink to="/collection/laptop">Laptops</NavLink>
            </ul>
            <div className="row">
                {
                    nfts ?
                        nfts.length > 0 ?
                            auction ?
                                nfts.map((nft, idx) => {
                                    if (nft.bidding) {
                                        return (
                                            <Card toggleBidding={toggleBidding} nft={nft} />
                                        )
                                    }
                                })
                                :
                                nfts.map((nft, idx) => (
                                    <Card toggleBidding={toggleBidding} nft={nft} />
                                ))
                            :
                            <AiFillPicture className='empty' />
                        :
                        <Spinner />
                }
            </div>
            <div className="overlay" ref={biddingRef}>
                <form action="" onSubmit={bid}>
                    <FaTimesCircle className="remove" onClick={toggleBidding} />
                    <h2>Bidding</h2>
                    <input readOnly type="tel" name='tokenId' value={id} style={{ display: "none" }} />
                    <input type="number" name='amount' />
                    <button>Bid</button>
                </form>
            </div>
        </section>
    )
}

export default Collection