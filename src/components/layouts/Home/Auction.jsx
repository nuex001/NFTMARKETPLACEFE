import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';
import { FaEthereum } from "react-icons/fa"
function Auction() {
    return (
        <section className="recent">
            <h1>LIVE AUTION</h1>
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
                <SwiperSlide className="slides">
                    <Link to={`view/id`}>
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
                <SwiperSlide className="slides">
                    <Link to={`view/id`}>
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
                <SwiperSlide className="slides">
                    <Link to={`view/id`}>
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
                <SwiperSlide className="slides">
                    <Link to={`view/id`}>
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
                <SwiperSlide className="slides">
                    <Link to={`view/id`}>
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
                <SwiperSlide className="slides">
                    <Link to={`view/id`}>
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
            </Swiper>
            <Link to="" className='view'>See more...</Link>
        </section>
    )
}

export default Auction