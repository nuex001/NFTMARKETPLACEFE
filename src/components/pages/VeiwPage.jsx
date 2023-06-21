import React, { useEffect, useState, useRef } from 'react'
import "../../assets/css/view.css"
import { AiFillPicture } from 'react-icons/ai';
import Recent from '../layouts/Home/Recent'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setNft } from "../../redux/nftsStore"
import { FaTimesCircle } from "react-icons/fa"
import Spinner from '../Spinner';
import { useParams, useNavigate } from "react-router-dom";
import { convertUnitTimestamp, fetchNft, convertToDollar } from "../../utils/utils";
// import { fetchIpfsHash } from '../../utils/utils';
import Web3 from "web3"
import { ToastContainer, toast } from "react-toastify";

function VeiwPage() {
    const display = useRef();
    const { tokenId } = useParams();
    const [nft, setNft] = useState(null);
    const biddingRef = useRef();
    const resaleRef = useRef();
    const [id, setId] = useState(0);
    const { pathname } = useLocation();

    const [auction, setAuction] = useState(false);
    const dispatch = useDispatch();
    const { error, success, contract, owner, provider } = useSelector((state) => state.nftsStore);
    // 
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

    const fetchNftDetails = async (tokenId) => {
        const res = await contract.methods.fetchNFTsDetails(Number(tokenId)).call();
        const paramsData = { contract, res };
        const data = await fetchNft(paramsData);
        console.log(data);
        setNft(data);
    }
    useEffect(() => {
        if (contract) {
            console.log(tokenId);
            fetchNftDetails(tokenId);
        }
    }, [contract])

    const toggleImg = (e) => {
        const dataSrc = e.target.getAttribute("data-src");
        display.current.style = `background-image:url('${dataSrc}')`
        console.log(dataSrc);
    }

    const toggleBidding = (e) => {
        e.preventDefault();
        setId(e.target.getAttribute("data-index"))
        biddingRef.current.classList.toggle("active");
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
                    getNfts();
                }
            })
            .on('error', () => {
                // console.log("Error Occurred", error);
            })

    }
    const buyNft = async (e) => {
        e.preventDefault();
        const tokenId = e.target.getAttribute("data-index");
        const price = e.target.getAttribute("data-price");
        const res = await contract.methods.createMarketSale(tokenId).send(
            {
                from: owner,
                value: Web3.utils.toWei(price, "ether")
            }
        );;
    }
    // Resale
    const toggleReselling = (e) => {
        e.preventDefault();
        setId(e.target.getAttribute("data-index"))
        resaleRef.current.classList.toggle("active");
    }
    const resale = async (e) => {
        e.preventDefault();
        const amount = e.target.amount.value.trim()
        const res = await contract.methods.reSellToken(id, amount).send(
            {
                from: owner,
                value: Web3.utils.toWei(0.00025, "ether")
            }
        );
        // waiting for event
        const latestBlockNumber = await provider.eth.getBlockNumber();
        contract.events.Resell({
            filter: { seller: owner },
            fromBlock: latestBlockNumber,
            toBlock: latestBlockNumber
        })
            .on('data', function (event) {
                if (event.returnValues.seller === owner) {
                    successMsg("Resale Made Successfully")
                    resaleRef.current.classList.remove("active");
                    fetchNftDetails();
                }
            })
            .on('error', () => {
                // console.log("Error Occurred", error);
            })
    }
    const end = async (e) => {
        e.preventDefault();
        const tokenId = e.target.getAttribute("data-index");
        const res = await contract.methods.end(tokenId).send(
            { from: owner }
        );;
    }

    const start = async (e) => {
        e.preventDefault();
        const tokenId = e.target.getAttribute("data-index");
        const res = await contract.methods.startAuction(tokenId).send(
            { from: owner }
        );
        getNfts();
    }
    const withdrawBids = async () => {
        const res = await contract.methods.withdrawBids(tokenId).send(
            { from: owner }
        );
        // waiting for event
        const latestBlockNumber = await provider.eth.getBlockNumber();
        contract.events.WithdrawBids({
            filter: { bidder: owner },
            fromBlock: latestBlockNumber,
            toBlock: latestBlockNumber
        })
            .on('data', function (event) {
                if (event.returnValues.bidder === owner) {
                    successMsg("Withdraw Made Successfully")
                }
            })
            .on('error', () => {
                // console.log("Error Occurred", error);
            })
    }

useEffect(() => {
    fetchNftDetails(tokenId);
    }, [pathname])


    return (
        <>
            <div className="view">
                <ToastContainer />
                {nft
                    ?
                    <>
                        <div className="display">
                            <div className="mainDiv" ref={display} style={{ backgroundImage: `url(${nft.covers[0]})` }}></div>
                            <div className="sidebar">
                                {
                                    nft.covers.map(cover => (
                                        <img src={cover} alt="" data-src={cover} onClick={toggleImg} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="details">
                            <div className="head">
                                <h1>
                                    {nft.itemType}
                                    <span>
                                        {nft.name}
                                    </span>
                                </h1>
                                <h1>
                                    Remaining Time
                                    <span>
                                        {nft.bidding ? convertUnitTimestamp(nft.timestamp) : ""}
                                    </span>
                                </h1>
                            </div>
                            <h2>DETAILS :</h2>
                            <p>
                                {nft.details}
                            </p>
                            <h2>ID :
                                {nft.seller === owner || nft.owner === owner ?
                                    nft.id
                                    :
                                    ""
                                }
                            </h2>
                            <div className="footer">
                                <div className="box">
                                    <h3>
                                        Current price
                                    </h3>
                                    <h2>{nft.price}ETH <span> ${convertToDollar(nft.price)}</span></h2>
                                </div>
                                {
                                    nft.bidding ?
                                        nft.timeElapse ?
                                            nft.owner === contract._address ?
                                                <button onClick={withdrawBids} data-index={nft.tokenId}>Withdraw</button>
                                                :
                                                <button data-index={nft.tokenId} onClick={end}>END NOW</button>
                                            :
                                            !nft.started && nft.seller === owner ?
                                                <button onClick={start} data-index={nft.tokenId}>Start</button>
                                                :
                                                nft.started ?
                                                    <button onClick={toggleBidding} data-index={nft.tokenId}>BID NOW</button>
                                                    :
                                                    <button >Not started</button>
                                        :
                                        nft.sold ?
                                            nft.owner === owner ?
                                                <button onClick={toggleReselling} data-index={nft.tokenId}>Resale</button>
                                                :
                                                <button>Sold</button>
                                            :
                                            <button onClick={buyNft} data-price={nft.price} data-index={nft.tokenId}>BUY</button>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <AiFillPicture className='icon' />
                }
                <div className="overlay" ref={biddingRef}>
                    <form action="" onSubmit={bid}>
                        <FaTimesCircle className="remove" onClick={toggleBidding} />
                        <h2>Bidding</h2>
                        <input readOnly type="tel" name='tokenId' value={id} style={{ display: "none" }} />
                        <input type="number" name='amount' />
                        <button>Bid</button>
                    </form>
                </div>
                <div className="overlay" ref={resaleRef}>
                    <form action="" onSubmit={resale}>
                        <FaTimesCircle className="remove" onClick={toggleReselling} />
                        <h2>Resale</h2>
                        <input readOnly type="tel" name='tokenId' value={id} style={{ display: "none" }} />
                        <input type="number" name='amount' />
                        <button>Resale</button>
                    </form>
                </div>
            </div>
            <Recent />
        </>
    )
}

export default VeiwPage


/**
 * name
 * details
 * id - imel 
 * for ipfs
 */