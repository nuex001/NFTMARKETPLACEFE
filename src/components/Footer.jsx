import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaPaperPlane  , FaLinkedinIn} from "react-icons/fa"

function Footer() {
  return (
    <footer>
      <div className="row">
        <a href='/' className="logo">
          STRT<span>NFT</span>
        </a>
        <ul>
          <li><Link to="#">MarketPlace</Link></li>
          <li><Link to="#">Collection</Link></li>
          <li><Link to="#">Create</Link></li>
        </ul>
      </div>
      <div className="row">
      <ul>
          <li>Copyright&copy; 2023 Strt</li>
          <li><Link to="#">Help Center</Link></li>
          <li><Link to="#">Yoo</Link></li>
        </ul>
        <ul>
          <li>
          <a href="#"> <FaTwitter className='icon'/></a>
          </li>
          <li>
          <a href="#"> <FaLinkedinIn className='icon'/></a>
          </li>
          <li>
          <a href="#"> <FaPaperPlane className='icon'/></a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer