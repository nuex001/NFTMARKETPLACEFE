import React from 'react'
import { Link } from 'react-router-dom'
import { FaEthereum } from "react-icons/fa"

function Card() {
  return (
    <Link to="../view" className="card">
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
  )
}

export default Card