import React from 'react'
import { FaShoppingCart , FaWallet , FaDashcube} from 'react-icons/fa'
function Guild() {
  return (
    <section className="guild">
         <h1>Create Your Sell NFT</h1>
         <div className="rows">
            <div className="box">
                <FaWallet className='icon'/>
                <h4>Connect wallet</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat repellat eligendi illo dicta, explicabo minus nobis quod aspernatur pariatur! Repellendus!</p>
            </div>
            <div className="box">
            <FaShoppingCart className='icon'/>
            <h4>NFT Marketplace</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat repellat eligendi illo dicta, explicabo minus nobis quod aspernatur pariatur! Repellendus!</p>
            </div>
            <div className="box">
            <FaDashcube className='icon'/>
                <h4>Collect Nft</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat repellat eligendi illo dicta, explicabo minus nobis quod aspernatur pariatur! Repellendus!</p>
            </div>
         </div>
    </section>
  )
}

export default Guild