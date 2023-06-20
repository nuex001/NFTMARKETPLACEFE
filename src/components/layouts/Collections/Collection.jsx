import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Card from "../../Card"
import { useDispatch, useSelector } from "react-redux";
import { setNfts } from "../../../redux/nftsStore"
import Spinner from '../../Spinner';

function Collection({ address }) {
    const [auction, setAuction] = useState(false);
    const dispatch = useDispatch();
    const { error, success, contract, nfts } = useSelector((state) => state.nftsStore);

    const fetchNfts = async () => {
        const res = await contract.methods.fetchMarketItem().call();
        dispatch(setNfts(res));
    }
    const fetchandFilterNfts = async (txt) => {
        const res = await contract.methods.filterNftCat(txt).call();
        dispatch(setNfts(res));
    }
    // 
    const fetchandFilterNftsByAddress = async (txt) => {
        const res = await contract.methods.filterNftByAdress(txt).call();
        dispatch(setNfts(res));
    }
    useEffect(() => {
        if (contract) {
            fetchNfts();
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
            fetchandFilterNfts(cat);
            setAuction(false);
        } else if (pathname === "/collection/auction") {
            fetchNfts();
            setAuction(true);
        }
    }, [pathname])
    return (
        <section className="collection">
            <ul>
                <NavLink to="/collection/">Recent</NavLink>
                <NavLink to="/collection/sold">Sold</NavLink>
                <NavLink to="/collection/sale">Sale</NavLink>
                <NavLink to="/collection/auction">Auctions</NavLink>
                <NavLink to="/collection/mobile">Mobile</NavLink>
                <NavLink to="/collection/laptops">Laptops</NavLink>
            </ul>
            <div className="row">
                {
                    nfts.length > 0 ?
                        auction ?
                            nfts.map((nft, idx) => {
                                if (nft.bidding) {
                                    return (
                                        <Card />
                                    )
                                } else {
                                    return <></>
                                }

                            })
                            :
                            nfts.map((nft, idx) => {
                                <Card />
                            })
                        :
                        <Spinner />
                }

                {/* <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> */}
            </div>
        </section>
    )
}

export default Collection