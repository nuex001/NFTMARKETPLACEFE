import React, { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';
import { FaEthereum, FaTimesCircle } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { setNfts } from "../../../redux/nftsStore"
import Spinner from '../../Spinner';
import { AiFillPicture } from 'react-icons/ai';
import { convertUnitTimestamp, fetchNfts, convertToDollar } from "../../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import Web3 from "web3"

function Auction() {
    const dispatch = useDispatch();
    const biddingRef = useRef();
    const { error, success, contract, provider, owner } = useSelector((state) => state.nftsStore);
    const [nfts, setNfts] = useState(null);
    const [id, setId] = useState(0);

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
    useEffect(() => {
        if (contract) {
            getNfts();
            // console.log(contract._address);
        }
    }, [contract])

    const toggleBidding = (e) => {
        e.preventDefault();
        console.log(e.target);
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
    const end = async (e) => {
        e.preventDefault();
        const tokenId = e.target.getAttribute("data-index");
        const res = await contract.methods.end(tokenId).send(
            { from: owner }
        );
        // waiting for event
        const latestBlockNumber = await provider.eth.getBlockNumber();
        contract.events.End({
            filter: {},
            fromBlock: latestBlockNumber,
            toBlock: latestBlockNumber
        })
            .on('data', function (event) {
                successMsg("Bidding Ended Successfully")
                biddingRef.current.classList.remove("active");
                getNfts();
            })
            .on('error', () => {
                // console.log("Error Occurred", error);
            })
    }
    const start = async (e) => {
        e.preventDefault();
        const tokenId = e.target.getAttribute("data-index");
        const res = await contract.methods.startAuction(tokenId).send(
            { from: owner }
        );
        getNfts();
    }
    return (
        <section className="recent">
            <ToastContainer />
            <h1>LIVE AUTION</h1>
            {
                nfts ?
                    nfts.length > 0 ?
                        <Swiper
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                1240: {
                                    slidesPerView: 4,
                                },
                            }}
                            slidesPerView={4}
                            className="rows"
                        >
                            {nfts.map((nft, idx) => {
                                if (idx < 7 && nft.bidding) {
                                    return (
                                        <SwiperSlide className="slides" key={nft.tokenId}>
                                            <Link to={`view/${nft.tokenId}`}>
                                                <div className="head">
                                                    <h4>Remaining time</h4>
                                                    <h2>
                                                        {convertUnitTimestamp(nft.timestamp)}
                                                    </h2>
                                                </div>
                                                <img src={nft.cover} alt="" />
                                                <div className="footer">
                                                    <div className="box">
                                                        <h3>
                                                            Current price
                                                        </h3>
                                                        <h2> <FaEthereum className='icon' />{nft.price}
                                                            <span>${convertToDollar(nft.price)}</span>
                                                        </h2>
                                                    </div>
                                                    {
                                                        nft.timeElapse ?
                                                            nft.owner !== contract._address ?
                                                                <button>ENDED</button>
                                                                :
                                                                <button onClick={end}  data-index={nft.tokenId}>END NOW</button>
                                                            :
                                                            !nft.started && nft.seller === owner ?
                                                                <button onClick={start} data-index={nft.tokenId}>Start</button>
                                                                :
                                                                nft.started ?
                                                                    <button onClick={toggleBidding} data-index={nft.tokenId}>BID NOW</button>
                                                                    :
                                                                    <button >Not started</button>
                                                    }
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                }

                            })}
                        </Swiper>
                        :
                        <AiFillPicture className='empty' />
                    :
                    <Spinner />
            }


            <Link to="/collection" className='view'>See more...</Link>
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

export default Auction