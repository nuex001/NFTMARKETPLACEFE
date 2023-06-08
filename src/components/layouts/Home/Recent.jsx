import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';
import { FaEthereum } from "react-icons/fa"
function Recent() {
    return (
        <section className="recent">
            <h1>Recent Products</h1>
            <Swiper
                breakpoints={{
                    0: {
                        slidesPerView: 1.7,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1240: {
                        slidesPerView: 3,
                    },
                }}
                slidesPerView={3.8}
                className="rows"
            >
                <SwiperSlide className="slides">
                    <Link to={`viewPage`}>
                        <div className="head">
                            <h4>Remaining time</h4>
                            <h2>12:23M:02S</h2>
                        </div>
                        <img src="/nft6.jpg" alt="" />
                        <div className="footer">
                            <div className="box">
                                <h3>
                                    Current price
                                </h3>
                                <h2>3.05ETH <span>$321,23</span></h2>
                            </div>
                            <button>BID NOW</button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className="slides">
                    <Link to={`viewPage`}>
                        <div className="head">
                            <h4>Remaining time</h4>
                            <h2>12:23M:02S</h2>
                        </div>
                        <img src="/nft4.jpg" alt="" />
                        <div className="footer">
                            <div className="box">
                                <h3>
                                    Current price
                                </h3>
                                <h2>3.05ETH <span>$321,23</span></h2>
                            </div>
                            <button>BID NOW</button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className="slides">
                    <Link to={`viewPage`}>
                        <div className="head">
                            <h4>Remaining time</h4>
                            <h2>12:23M:02S</h2>
                        </div>
                        <img src="/nft4.jpg" alt="" />
                        <div className="footer">
                            <div className="box">
                                <h3>
                                    Current price
                                </h3>
                                <h2>3.05ETH <span>$321,23</span></h2>
                            </div>
                            <button>BID NOW</button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className="slides">
                    <Link to={`viewPage`}>
                        <div className="head">
                            <h4>Remaining time</h4>
                            <h2>12:23M:02S</h2>
                        </div>
                        <img src="/nft4.jpg" alt="" />
                        <div className="footer">
                            <div className="box">
                                <h3>
                                    Current price
                                </h3>
                                <h2>3.05ETH <span>$321,23</span></h2>
                            </div>
                            <button>BID NOW</button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className="slides">
                    <Link to={`viewPage`}>
                        <div className="head">
                            <h4>Remaining time</h4>
                            <h2>12:23M:02S</h2>
                        </div>
                        <img src="/nft4.jpg" alt="" />
                        <div className="footer">
                            <div className="box">
                                <h3>
                                    Current price
                                </h3>
                                <h2>3.05ETH <span>$321,23</span></h2>
                            </div>
                            <button>BID NOW</button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className="slides">
                    <Link to={`viewPage`}>
                        <div className="head">
                            <h4>Remaining time</h4>
                            <h2>12:23M:02S</h2>
                        </div>
                        <img src="/nft4.jpg" alt="" />
                        <div className="footer">
                            <div className="box">
                                <h3>
                                    Current price
                                </h3>
                                <h2>3.05ETH <span>$321,23</span></h2>
                            </div>
                            <button>BID NOW</button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className="slides">
                    <Link to={`viewPage`}>
                        <div className="head">
                            <h4>Remaining time</h4>
                            <h2>12:23M:02S</h2>
                        </div>
                        <img src="/nft4.jpg" alt="" />
                        <div className="footer">
                            <div className="box">
                                <h3>
                                    Current price
                                </h3>
                                <h2>3.05ETH <span>$321,23</span></h2>
                            </div>
                            <button>BID NOW</button>
                        </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Recent