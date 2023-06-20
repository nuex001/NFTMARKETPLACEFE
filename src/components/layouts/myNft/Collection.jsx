import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Card from "../../Card"
import { useDispatch, useSelector } from "react-redux";
import { setNfts } from "../../../redux/nftsStore"
import Spinner from '../../Spinner';
import { AiFillPicture } from 'react-icons/ai';

function Collection() {
    const [auction, setAuction] = useState(false);
    const dispatch = useDispatch();
    const { error, success, contract, nfts } = useSelector((state) => state.nftsStore);

    const fetchNfts = async () => {
        const res = await contract.methods.fetchMyNFTs().call();
        dispatch(setNfts(res));
    }
    useEffect(() => {
        if (contract) {
            fetchNfts();
        }
    }, [contract])
    return (
        <section className="collection">
            <div className="row">
                {
                    nfts ?
                        nfts.length > 1 ?
                            nfts.map(nft => (
                                <Card />
                            ))
                            :
                            <AiFillPicture className='icon' />
                        :
                        <Spinner />
                }
            </div>
        </section>
    )
}

export default Collection