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
                <li><Link to="#">MarketPlace</Link></li>
                <li><Link to="#">Community</Link></li>
                <li><Link to="#">Collection</Link></li>
                <li><Link to="#">Create</Link></li>
                <button>
                    Connect Wallet
                </button>
            </ul>
            <HiOutlineBars3BottomRight className='menu' onClick={toggleNav} />
        </nav>
    )
}

export default Nav