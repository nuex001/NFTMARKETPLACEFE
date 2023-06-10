import React from 'react'
import Header from '../layouts/Home/Header'
import Recent from '../layouts/Home/Recent'
import Auction from '../layouts/Home/Auction'
import Guild from '../layouts/Home/Guild'
import Join from '../layouts/Home/Join'
import "../../assets/css/home.css"

function Home() {
    return (
        <div className="home">
            <Header />
            <Auction />
            <Recent />
            <Guild />
            <Join />
        </div>
    )
}

export default Home