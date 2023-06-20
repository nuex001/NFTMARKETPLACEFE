import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';
import { FaEthereum } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { setNfts } from "../../../redux/nftsStore"
import Spinner from '../../Spinner';

function Recent() {
    const dispatch = useDispatch();
    const { error, success, contract, nfts } = useSelector((state) => state.nftsStore);

    const fetchNfts = async () => {
        const res = await contract.methods.fetchMarketItem().call();
        dispatch(setNfts(res))
    }
    useEffect(() => {
        if (contract) {
            fetchNfts();
        }
    }, [contract])

    return (
        <section className="recent">
            <h1>Recent Products</h1>
            {
                nfts.length > 0 ?
                    <Swiper
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1240: {
                                slidesPerView: 4,
                            },
                        }}
                        slidesPerView={4}
                        className="rows"
                    >
                        {nfts.map((nft, idx) => {
                            if (idx < 7 && !nft.bidding) {
                                return (
                                    <SwiperSlide className="slides">
                                        <Link to={`/view/id`}>
                                            <div className="head">
                                                <h4>Remaining time</h4>
                                                <h2>12:23M:02S</h2>
                                            </div>
                                            <img src="/nft7.jpg" alt="" />
                                            <div className="footer">
                                                <div className="box">
                                                    <h3>
                                                        Current price
                                                    </h3>
                                                    <h2> <FaEthereum className='icon' /> 3.05<span>$321,23</span></h2>
                                                </div>
                                                <button>BID NOW</button>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            } else {
                                return <></>
                            }

                        })}
                    </Swiper>
                    :
                    <Spinner />
            }
            <Link to="/collection" className='view'>See more...</Link>
        </section>
    )
}

export default Recent