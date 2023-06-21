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

function Collection() {
    const [auction, setAuction] = useState(false);
    const dispatch = useDispatch();
    const { error, success, contract } = useSelector((state) => state.nftsStore);
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
        const res = await contract.methods.fetchMyNFTs().call();
        const paramsData = { contract, res };
        const data = await fetchNfts(paramsData);
        setNfts(data);
    }
    useEffect(() => {
        if (contract) {
            getNfts();
        }
    }, [contract])
    return (
        <section className="collection">
            <div className="row">
                {
                    nfts ?
                        nfts.length > 0 ?
                            nfts.map(nft => (
                                <Card nft={nft}/>
                            ))
                            :
                            <AiFillPicture className='empty' />
                        :
                        <Spinner />
                }
            </div>
        </section>
    )
}

export default Collection