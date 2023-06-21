import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaEthereum } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { AiFillPicture } from 'react-icons/ai';
import { convertUnitTimestamp, fetchNfts, convertToDollar } from "../utils/utils";
import { toast } from "react-toastify";
function Card({ nft, toggleBidding }) {
  const dispatch = useDispatch();
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

  const buyNft = async (e) => {
    e.preventDefault();
    const tokenId = e.target.getAttribute("data-index");
    const price = e.target.getAttribute("data-price");
    const res = await contract.methods.createMarketSale(tokenId).send(
      {
        from: owner,
        value: Web3.utils.toWei(price, "ether")
      }
    );
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
    // getNfts();
  }
  return (
    <>
      <Link to={`../view/${nft.tokenId}`} className="card">
        <div className="head">
          {
            nft.bidding ?
              <>
                <h4>Remaining time</h4>
                <h2>
                  {convertUnitTimestamp(nft.timestamp)}
                </h2>
              </>
              :
              <>
                <h4>{nft.name}</h4>
                <h2>
                  {nft.itemType}
                </h2>
              </>

          }
        </div>
        <img src={nft.cover} alt="" />
        <div className="footer">
          <div className="box">
            <h3>
              Current price
            </h3>
            <h2>
              <FaEthereum className='icon' />{nft.price}
              <span>${convertToDollar(nft.price)}</span></h2>
          </div>
          {
            nft.bidding ?
              nft.timeElapse ?
                nft.owner !== contract._address ?
                  <button>ENDED</button>
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
                <button>
                  {nft.owner = owner ? "BOUGHT" : "SOLD"}
                </button>
                :
                <button onClick={buyNft} data-price={nft.price} data-index={nft.tokenId}>BUY</button>
          }

        </div>
      </Link>
    </>
  )
}

export default Card