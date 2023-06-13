import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AiFillCloseCircle } from "react-icons/ai"
import { HiOutlineBars3BottomRight } from "react-icons/hi2"
function Nav() {
    const navRef = useRef();
    const toggleNav = () => {
        navRef.current.classList.toggle("active");
    }
    return (
        <nav>
            <a href='/' className="logo">
                STRT<span>NFT</span>
            </a>
            <ul ref={navRef}>
                <AiFillCloseCircle className='close' onClick={toggleNav} />
                <li><Link to="/collection/" onClick={toggleNav}>MarketPlace</Link></li>
                <li><Link to="#" onClick={toggleNav}>Community</Link></li>
                <li><Link to="/mynft" onClick={toggleNav}>MyNFT</Link></li>
                <li><Link to="/create" onClick={toggleNav}>Create</Link></li>
                <button>
                    Connect Wallet
                </button>
            </ul>
            <HiOutlineBars3BottomRight className='menu' onClick={toggleNav} />
        </nav>
    )
}

export default Nav