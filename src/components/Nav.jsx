import React from 'react'

function Nav() {
    return (
        <nav>
            <div className="logo">
            STRT<span>NFT</span>
            </div>
            <ul>
                <li><a href="#">MarketPlace</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Collection</a></li>
                <li><a href="#">Create</a></li>
            </ul>
            <button>
                Connect Wallet
            </button>
        </nav>
    )
}

export default Nav